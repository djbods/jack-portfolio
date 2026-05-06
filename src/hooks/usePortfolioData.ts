/**
 * usePortfolioData.ts
 *
 * Central data hook. Attempts to load from Firebase; falls back to
 * staticData transparently. No Firebase config = instant static load.
 */

import { useState, useEffect } from 'react'
import type { PortfolioData } from '@/types'
import {
  fetchProjects,
  fetchExperience,
  fetchSkills,
  fetchConfig,
} from '@/lib/firebase'
import {
  STATIC_PROJECTS,
  STATIC_EXPERIENCE,
  STATIC_SKILLS,
  STATIC_CONFIG,
} from '@/lib/staticData'

export function usePortfolioData(): PortfolioData {
  const [data, setData] = useState<PortfolioData>({
    config:     null,
    projects:   [],
    experience: [],
    skills:     [],
    loading:    true,
    error:      null,
  })

  useEffect(() => {
    async function load() {
      try {
        // Fire all fetches concurrently
        const [config, projects, experience, skills] = await Promise.all([
          fetchConfig(),
          fetchProjects(),
          fetchExperience(),
          fetchSkills(),
        ])

        setData({
          config:     config                              ?? STATIC_CONFIG,
          projects:   (projects   && projects.length   > 0) ? projects   : STATIC_PROJECTS,
          experience: (experience && experience.length > 0) ? experience : STATIC_EXPERIENCE,
          skills:     (skills     && skills.length     > 0) ? skills     : STATIC_SKILLS,
          loading:    false,
          error:      null,
        })
      } catch (err) {
        console.warn('[usePortfolioData] Firebase error — using static data.', err)
        setData({
          config:     STATIC_CONFIG,
          projects:   STATIC_PROJECTS,
          experience: STATIC_EXPERIENCE,
          skills:     STATIC_SKILLS,
          loading:    false,
          error:      null, // graceful — not a hard error
        })
      }
    }

    load()
  }, [])

  return data
}
