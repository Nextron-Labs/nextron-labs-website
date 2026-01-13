import * as fs from 'fs/promises'
import * as path from 'path'
import { createWriteStream } from 'fs'

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  archived: boolean
  disabled: boolean
  default_branch: string
  language: string | null
  private: boolean
  updated_at: string
}

interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  status: 'active' | 'maintenance' | 'development' | 'archived'
  github?: string
  docs?: string
  download?: string
  screenshot?: string
}

// GitHub API token (optional, but recommended for rate limits)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

async function fetchAllRepos(org: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const url = `https://api.github.com/orgs/${org}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }

    console.log(`Fetching page ${page}...`)
    const response = await fetch(url, { headers })
    
    if (!response.ok) {
      if (response.status === 404) {
        break
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data: GitHubRepo[] = await response.json()
    
    if (data.length === 0) {
      break
    }

    repos.push(...data)
    
    // If we got less than perPage, we're done
    if (data.length < perPage) {
      break
    }
    
    page++
    
    // Rate limiting: wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return repos
}

async function fetchREADME(repo: GitHubRepo): Promise<string | null> {
  const readmeUrls = [
    `https://api.github.com/repos/${repo.full_name}/readme`,
    `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`,
    `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/readme.md`,
  ]

  for (const url of readmeUrls) {
    try {
      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      }
      
      if (GITHUB_TOKEN) {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`
      }

      const response = await fetch(url, { headers })
      
      if (response.ok) {
        if (url.includes('/readme')) {
          // GitHub API returns base64 encoded content
          const data = await response.json()
          return Buffer.from(data.content, 'base64').toString('utf-8')
        } else {
          // Raw URL returns plain text
          return await response.text()
        }
      }
    } catch (error) {
      console.log(`Failed to fetch README from ${url}: ${error}`)
    }
  }

  return null
}

function extractFirstImage(readme: string, repo: GitHubRepo): string | null {
  // Match markdown images: ![alt](url) or <img src="url">
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/g
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/gi
  
  // Badge patterns to skip - be more aggressive
  const badgePatterns = [
    /shields\.io/i,
    /badge/i,
    /travis-ci/i,
    /readthedocs\.org/i,
    /github\.com.*workflows/i,
    /github\.com.*actions/i,
    /godoc\.org/i,
    /\.svg$/i, // Skip SVG files (often badges) unless they're clearly images
    /status\.svg/i,
    /build.*\.svg/i,
    /coverage/i,
  ]
  
  // Image file extensions we prefer
  const imageExtensions = /\.(png|jpg|jpeg|gif|webp)$/i
  
  const isBadge = (url: string): boolean => {
    // If it's a badge pattern, skip it
    if (badgePatterns.some(pattern => pattern.test(url))) {
      return true
    }
    // If it's an SVG and doesn't look like an actual image (contains "badge", "status", "build", etc.)
    if (url.match(/\.svg$/i) && /badge|status|build|coverage|workflow|action/i.test(url)) {
      return true
    }
    return false
  }
  
  // Collect all images, prioritizing actual image files
  const images: string[] = []
  const svgImages: string[] = [] // SVGs as fallback
  
  // Find markdown images
  let match
  while ((match = markdownImageRegex.exec(readme)) !== null) {
    if (match[1]) {
      if (isBadge(match[1])) {
        continue
      }
      if (imageExtensions.test(match[1])) {
        images.push(match[1])
      } else if (match[1].match(/\.svg$/i)) {
        svgImages.push(match[1])
      } else {
        // Unknown format, but not a badge - include it
        images.push(match[1])
      }
    }
  }
  
  // Find HTML images
  while ((match = htmlImageRegex.exec(readme)) !== null) {
    if (match[1]) {
      if (isBadge(match[1])) {
        continue
      }
      if (imageExtensions.test(match[1])) {
        images.push(match[1])
      } else if (match[1].match(/\.svg$/i)) {
        svgImages.push(match[1])
      } else {
        images.push(match[1])
      }
    }
  }
  
  // Return first actual image file, then SVG, then nothing
  if (images.length > 0) {
    return images[0]
  }
  
  if (svgImages.length > 0) {
    return svgImages[0]
  }
  
  return null
}

async function downloadImage(imageUrl: string, savePath: string, repo: GitHubRepo): Promise<boolean> {
  try {
    let finalUrl = imageUrl
    
    // Handle relative URLs - convert to GitHub raw URL
    if (imageUrl.startsWith('./') || imageUrl.startsWith('../') || imageUrl.startsWith('/')) {
      // Construct GitHub raw URL
      const imagePath = imageUrl.replace(/^\.\//, '').replace(/^\/+/, '')
      finalUrl = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${imagePath}`
    } else if (!imageUrl.startsWith('http')) {
      // Relative path without ./ or ../ - handle query strings like ?raw=true
      const cleanUrl = imageUrl.split('?')[0] // Remove query params
      finalUrl = `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/${cleanUrl}`
    } else if (imageUrl.includes('github.com') && !imageUrl.includes('raw.githubusercontent.com')) {
      // Convert GitHub blob URL to raw URL
      // e.g., https://github.com/user/repo/blob/main/image.png -> https://raw.githubusercontent.com/user/repo/main/image.png
      finalUrl = imageUrl
        .replace(/github\.com\/([^/]+\/[^/]+)\/blob\/([^/]+)\/(.+)/, 'raw.githubusercontent.com/$1/$2/$3')
        .replace(/github\.com\/([^/]+\/[^/]+)\/raw\/([^/]+)\/(.+)/, 'raw.githubusercontent.com/$1/$2/$3')
    }
    
    // Validate URL before fetching
    try {
      new URL(finalUrl)
    } catch {
      console.log(`  Invalid URL constructed: ${finalUrl}`)
      return false
    }
    
    // Skip external URLs that aren't GitHub (optional - you might want to allow these)
    // if (!finalUrl.includes('github.com') && !finalUrl.includes('githubusercontent.com')) {
    //   console.log(`  Skipping external image URL: ${imageUrl}`)
    //   return false
    // }

    console.log(`  Downloading from: ${finalUrl}`)
    const response = await fetch(finalUrl)
    if (!response.ok) {
      console.log(`  Failed to fetch: ${response.status} ${response.statusText}`)
      return false
    }

    // Ensure directory exists
    await fs.mkdir(path.dirname(savePath), { recursive: true })

    // Download and save
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    await fs.writeFile(savePath, buffer)
    
    return true
  } catch (error) {
    console.error(`  Failed to download image ${imageUrl}: ${error}`)
    return false
  }
}

function generateProjectId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function determineStatus(repo: GitHubRepo): 'active' | 'maintenance' | 'development' | 'archived' {
  if (repo.archived) {
    return 'archived'
  }
  if (repo.disabled) {
    return 'maintenance'
  }
  // You could add more logic here based on last updated date, etc.
  return 'active'
}

function extractTags(repo: GitHubRepo): string[] {
  // Use GitHub topics as tags, or infer from name/description
  const tags: string[] = []
  
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics.slice(0, 5)) // Limit to 5 tags
  }
  
  // Infer tags from name/description if no topics
  if (tags.length === 0) {
    const nameLower = repo.name.toLowerCase()
    const descLower = (repo.description || '').toLowerCase()
    const combined = `${nameLower} ${descLower}`
    
    const tagKeywords: Record<string, string> = {
      'yara': 'yara',
      'scanner': 'scanner',
      'detection': 'detection',
      'siem': 'siem',
      'forensics': 'forensics',
      'malware': 'malware',
      'ioc': 'ioc',
      'signature': 'signatures',
      'security': 'security',
      'threat': 'threat-hunting',
      'apt': 'apt',
      'windows': 'windows',
      'linux': 'linux',
      'unix': 'unix',
      'bash': 'bash',
      'python': 'python',
      'go': 'go',
      'manual': 'documentation',
      'guide': 'documentation',
      'api': 'api',
      'client': 'client',
      'integration': 'integration',
    }
    
    for (const [keyword, tag] of Object.entries(tagKeywords)) {
      if (combined.includes(keyword) && !tags.includes(tag)) {
        tags.push(tag)
        if (tags.length >= 5) break
      }
    }
  }
  
  return tags.length > 0 ? tags : ['security']
}

async function processRepos(): Promise<void> {
  // Load blacklist
  const blacklistPath = path.join(process.cwd(), 'scripts', 'repo-blacklist.json')
  let blacklist: string[] = []
  try {
    const blacklistContent = await fs.readFile(blacklistPath, 'utf-8')
    const rawBlacklist = JSON.parse(blacklistContent)
    // Normalize to lowercase for case-insensitive comparison
    blacklist = rawBlacklist.map((name: string) => name.toLowerCase())
    console.log(`Loaded blacklist with ${blacklist.length} repos`)
  } catch (error) {
    console.warn(`Warning: Could not load blacklist from ${blacklistPath}: ${error}`)
  }

  console.log('Fetching repositories from NextronSystems...')
  const repos = await fetchAllRepos('NextronSystems')
  console.log(`Found ${repos.length} repositories`)

  // Filter out private repos and blacklisted repos
  const filteredRepos = repos.filter(repo => {
    // Skip private repos
    if (repo.private) {
      console.log(`Skipping private repo: ${repo.name}`)
      return false
    }
    // Skip blacklisted repos
    if (blacklist.includes(repo.name.toLowerCase())) {
      console.log(`Skipping blacklisted repo: ${repo.name}`)
      return false
    }
    return true
  })

  console.log(`Processing ${filteredRepos.length} repos after filtering`)

  const projects: Project[] = []
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'projects')
  
  // Ensure images directory exists
  await fs.mkdir(imagesDir, { recursive: true })

  // Sort by updated_at (most recent first) - GitHub API already sorts, but ensure it
  filteredRepos.sort((a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })

  for (const repo of filteredRepos) {

    console.log(`\nProcessing: ${repo.name}`)
    
    const projectId = generateProjectId(repo.name)
    const project: Project = {
      id: projectId,
      name: repo.name,
      description: repo.description || `${repo.name} - ${repo.language || 'Open source'} project`,
      tags: extractTags(repo),
      status: determineStatus(repo),
      github: repo.html_url,
    }

    // Add homepage as docs if it exists
    if (repo.homepage) {
      project.docs = repo.homepage
    }

    // Try to fetch README and extract image
    try {
      const readme = await fetchREADME(repo)
      if (readme) {
        const imageUrl = extractFirstImage(readme, repo)
        
        if (imageUrl) {
          console.log(`  Found image: ${imageUrl}`)
          
          // Determine file extension from the final URL (after processing)
          let ext = '.png' // default
          try {
            // Try to get extension from original URL first
            if (imageUrl.includes('.')) {
              const urlMatch = imageUrl.match(/\.(png|jpg|jpeg|gif|svg|webp)(\?|$)/i)
              if (urlMatch) {
                ext = `.${urlMatch[1].toLowerCase()}`
              }
            }
          } catch {
            // Use default
          }
          
          const imageFilename = `${projectId}${ext}`
          const imagePath = path.join(imagesDir, imageFilename)
          
          // Download image
          const downloaded = await downloadImage(imageUrl, imagePath, repo)
          
          if (downloaded) {
            // Try to determine actual file type from downloaded content
            try {
              const stats = await fs.stat(imagePath)
              if (stats.size > 0) {
                // Check if file has correct extension by reading first bytes
                const buffer = await fs.readFile(imagePath)
                // Check magic numbers
                if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
                  // PNG
                  if (!imageFilename.endsWith('.png')) {
                    const newPath = imagePath.replace(/\.[^.]+$/, '.png')
                    await fs.rename(imagePath, newPath)
                    project.screenshot = `/images/projects/${projectId}.png`
                  } else {
                    project.screenshot = `/images/projects/${imageFilename}`
                  }
                } else if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
                  // JPEG
                  if (!imageFilename.match(/\.(jpg|jpeg)$/i)) {
                    const newPath = imagePath.replace(/\.[^.]+$/, '.jpg')
                    await fs.rename(imagePath, newPath)
                    project.screenshot = `/images/projects/${projectId}.jpg`
                  } else {
                    project.screenshot = `/images/projects/${imageFilename}`
                  }
                } else if (buffer[0] === 0x3C || (buffer[0] === 0x3C && buffer[1] === 0x3F)) {
                  // SVG (starts with < or <?)
                  if (!imageFilename.endsWith('.svg')) {
                    const newPath = imagePath.replace(/\.[^.]+$/, '.svg')
                    await fs.rename(imagePath, newPath)
                    project.screenshot = `/images/projects/${projectId}.svg`
                  } else {
                    project.screenshot = `/images/projects/${imageFilename}`
                  }
                } else {
                  project.screenshot = `/images/projects/${imageFilename}`
                }
                console.log(`  Downloaded image to: ${project.screenshot}`)
              }
            } catch {
              project.screenshot = `/images/projects/${imageFilename}`
              console.log(`  Downloaded image to: ${imagePath}`)
            }
          } else {
            console.log(`  Failed to download image`)
          }
        } else {
          console.log(`  No image found in README`)
        }
      } else {
        console.log(`  No README found`)
      }
    } catch (error) {
      console.error(`  Error processing README: ${error}`)
    }

    projects.push(project)
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Projects are already sorted by updated_at (most recent first) from the repo sorting

  // Write projects.json
  const projectsPath = path.join(process.cwd(), 'data', 'projects.json')
  await fs.writeFile(projectsPath, JSON.stringify(projects, null, 2))
  
  console.log(`\n✅ Generated ${projects.length} projects in ${projectsPath}`)
  console.log(`✅ Downloaded images to ${imagesDir}`)
}

// Run the script
processRepos().catch(console.error)
