import { useState, useEffect } from 'react';

export interface WebGLSupportResult {
  supported: boolean;
  isHardwareAccelerated: boolean;
  webglVersion: 1 | 2 | null;
  renderer: string | null;
  vendor: string | null;
  isMobile: boolean;
  isLowEnd: boolean;
}

/**
 * Detects WebGL support and GPU capabilities
 * Returns information about whether WebGL is available and if hardware acceleration is enabled
 */
export function detectWebGLSupport(): WebGLSupportResult {
  const result: WebGLSupportResult = {
    supported: false,
    isHardwareAccelerated: true,
    webglVersion: null,
    renderer: null,
    vendor: null,
    isMobile: false,
    isLowEnd: false,
  };

  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return result;
  }

  // Detect mobile devices
  result.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const canvas = document.createElement('canvas');

  // Try WebGL2 first, then fall back to WebGL1
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

  try {
    gl = canvas.getContext('webgl2') as WebGL2RenderingContext | null;
    if (gl) {
      result.webglVersion = 2;
    }
  } catch {
    // WebGL2 not available
  }

  if (!gl) {
    try {
      gl = (canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (gl) {
        result.webglVersion = 1;
      }
    } catch {
      // WebGL1 not available
    }
  }

  if (!gl) {
    return result;
  }

  result.supported = true;

  // Get renderer info to detect software rendering
  try {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      result.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
      result.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string;

      // Detect software renderers (no GPU acceleration)
      const softwareRenderers = [
        'SwiftShader',
        'LLVMpipe',
        'Software',
        'Microsoft Basic Render Driver',
        'VMware',
        'VirtualBox',
        'SVGA3D',
      ];

      result.isHardwareAccelerated = !softwareRenderers.some((sw) =>
        result.renderer?.toLowerCase().includes(sw.toLowerCase())
      );

      // Detect low-end GPUs
      const lowEndIndicators = [
        'Intel HD Graphics',
        'Intel UHD Graphics 6',
        'Mali-4',
        'Mali-T6',
        'Adreno 3',
        'Adreno 4',
        'PowerVR SGX',
      ];

      result.isLowEnd = lowEndIndicators.some((indicator) =>
        result.renderer?.includes(indicator)
      );
    }
  } catch {
    // Extension not available, assume hardware accelerated
  }

  // Also check for mobile low-end scenarios
  if (result.isMobile && !result.renderer) {
    result.isLowEnd = true;
  }

  // Clean up
  const loseContext = gl.getExtension('WEBGL_lose_context');
  if (loseContext) {
    loseContext.loseContext();
  }

  return result;
}

/**
 * React hook for WebGL support detection
 * Runs detection on mount and returns the result
 */
export function useWebGLSupport(): WebGLSupportResult & { isLoading: boolean } {
  const [result, setResult] = useState<WebGLSupportResult>({
    supported: false,
    isHardwareAccelerated: true,
    webglVersion: null,
    renderer: null,
    vendor: null,
    isMobile: false,
    isLowEnd: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Run detection asynchronously to not block render
    const detect = () => {
      const detected = detectWebGLSupport();
      setResult(detected);
      setIsLoading(false);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(detect);
    } else {
      setTimeout(detect, 0);
    }
  }, []);

  return { ...result, isLoading };
}

/**
 * Simple check if WebGL is available - synchronous version for quick checks
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default useWebGLSupport;
