// Performance detection utility for low-end device optimization

export type PerformanceTier = 'high' | 'medium' | 'low';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

interface PerformanceSettings {
  tier: PerformanceTier;
  pixelRatio: number;
  enablePostProcessing: boolean;
  enablePhysics: boolean;
  sphereSegments: number;
  shadowMapSize: number;
  enableAntialias: boolean;
}

// Detect device performance tier
export function detectPerformanceTier(): PerformanceTier {
  // Check for low memory devices
  const memory = (navigator as NavigatorWithMemory).deviceMemory;
  if (memory && memory <= 2) return 'low';
  if (memory && memory <= 4) return 'medium';

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency;
  if (cores && cores <= 2) return 'low';
  if (cores && cores <= 4) return 'medium';

  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // Check screen size for low-end indication
  const isSmallScreen = window.innerWidth < 768;
  
  if (isMobile && isSmallScreen) return 'low';
  if (isMobile) return 'medium';

  // Check WebGL capabilities
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for integrated/low-end GPUs
        if (/Intel|Mali|Adreno 3|Adreno 4|PowerVR/i.test(renderer)) {
          return 'medium';
        }
      }
    }
  } catch {
    // WebGL check failed, assume medium
    return 'medium';
  }

  return 'high';
}

// Get optimized settings based on performance tier
export function getPerformanceSettings(): PerformanceSettings {
  const tier = detectPerformanceTier();
  
  switch (tier) {
    case 'low':
      return {
        tier: 'low',
        pixelRatio: Math.min(window.devicePixelRatio, 1),
        enablePostProcessing: false,
        enablePhysics: false,
        sphereSegments: 12,
        shadowMapSize: 256,
        enableAntialias: false,
      };
    case 'medium':
      return {
        tier: 'medium',
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        enablePostProcessing: false,
        enablePhysics: true,
        sphereSegments: 16,
        shadowMapSize: 512,
        enableAntialias: false,
      };
    case 'high':
    default:
      return {
        tier: 'high',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        enablePostProcessing: true,
        enablePhysics: true,
        sphereSegments: 24,
        shadowMapSize: 512,
        enableAntialias: true,
      };
  }
}

// Singleton instance
let cachedSettings: PerformanceSettings | null = null;

export function getCachedPerformanceSettings(): PerformanceSettings {
  if (!cachedSettings) {
    cachedSettings = getPerformanceSettings();
  }
  return cachedSettings;
}
