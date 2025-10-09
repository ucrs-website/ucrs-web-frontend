---
description: Refine a section/page to match Figma design specifications
---

You are helping refine an existing section or page to match Figma design specifications.

**Context:**
- Project: UCRS Website (Next.js 15, React 19, TypeScript, Tailwind CSS)
- Design System: See CLAUDE.md and public/DesignSystem.json
- Component Location: components/sections/

**Your Task:**
1. Extract the node-id from any provided Figma URLs
2. Use Figma MCP tools to fetch design specifications
3. Identify the local route/page being refined
4. Compare current implementation with Figma design
5. Identify and document discrepancies:
   - Layout and spacing differences
   - Typography and color mismatches
   - Missing responsive behavior
   - Interactive state issues
6. Refactor the component to match design specs exactly
7. Maintain existing architecture and patterns
8. Test build and verify changes
9. Commit with descriptive message

**Design Comparison Checklist:**
- [ ] Section heading typography and spacing
- [ ] Content layout and grid structure
- [ ] Colors match design system variables
- [ ] Font sizes, weights, and line heights
- [ ] Spacing (padding, margins, gaps)
- [ ] Border radius and shadows
- [ ] Responsive breakpoints (mobile, tablet, desktop)
- [ ] Hover and active states
- [ ] Image sizes and aspect ratios
- [ ] Button styles and states

**Important:**
- DO preserve SEO optimization and accessibility
- DO maintain TypeScript types and interfaces
- DO use existing design system tokens
- DO NOT change data structures or logic
- DO NOT remove accessibility features
- DO NOT introduce new dependencies without asking

**Figma URL Format:**
Desktop: `https://www.figma.com/design/{file-id}?node-id={node-id}`
Mobile: `https://www.figma.com/design/{file-id}?node-id={node-id}`

Extract node-id and use: `mcp__figma-dev-mode-mcp-server__get_code` and `get_screenshot`
