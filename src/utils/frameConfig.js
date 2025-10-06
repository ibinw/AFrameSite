/**
 * Frame Configuration Manager
 * Loads and manages frame configurations from JSON file
 */

class FrameConfigManager {
  constructor() {
    this.config = null;
    this.baseUrl = this.getBaseUrl();
  }

  /**
   * Get base URL based on environment
   */
  getBaseUrl() {
    const hostname = window.location.hostname;
    return (hostname === 'localhost' || hostname === '127.0.0.1') 
      ? '' 
      : '/AFrameSite';
  }

  /**
   * Load frame configuration from JSON file
   */
  async loadConfig() {
    if (this.config) {
      return this.config;
    }

    try {
      const response = await fetch(this.baseUrl + '/configs/frames.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Error loading frame config:', error);
      // Fallback to default config if JSON fails to load
      this.config = this.getDefaultConfig();
      return this.config;
    }
  }

  /**
   * Get all frames
   */
  async getFrames() {
    const config = await this.loadConfig();
    return config.frames;
  }

  /**
   * Get frame by ID
   */
  async getFrameById(frameId) {
    const frames = await this.getFrames();
    return frames.find(frame => frame.id === frameId);
  }

  /**
   * Get frame by filename
   */
  async getFrameByFilename(filename) {
    const frames = await this.getFrames();
    return frames.find(frame => frame.filename === filename);
  }

  /**
   * Get default frame
   */
  async getDefaultFrame() {
    const config = await this.loadConfig();
    return await this.getFrameById(config.settings.defaultFrame);
  }

  /**
   * Get frame specs for photocropping page
   */
  async getFrameSpecs(frameId) {
    const frame = await this.getFrameById(frameId);
    if (!frame) {
      console.warn(`Frame ${frameId} not found, using default`);
      const defaultFrame = await this.getDefaultFrame();
      return defaultFrame.specs;
    }
    return frame.specs;
  }

  /**
   * Get frame path for image loading
   */
  getFramePath(filename) {
    return this.baseUrl + '/assets/frames/' + filename;
  }

  /**
   * Get settings
   */
  async getSettings() {
    const config = await this.loadConfig();
    return config.settings;
  }

  /**
   * Fallback default configuration
   */
  getDefaultConfig() {
    return {
      "frames": [
        {
          "id": "frame_test_2",
          "name": "Classic Frame",
          "filename": "frame_test_2.png",
          "price": 49,
          "size": "10\" x 8\"",
          "description": "A timeless classic frame that complements any photo",
          "specs": {
            "frameSize": 1000,
            "canvasSize": 400,
            "transparentWidth": 603,
            "transparentHeight": 603,
            "transparentX": 198.5,
            "transparentY": 198.5
          },
          "exampleImage": "assets/frames/example_frame_1_1x1_classic_horizontal.png",
          "category": "classic"
        }
      ],
      "settings": {
        "defaultFrame": "frame_test_2",
        "baseUrl": {
          "local": "",
          "production": "/AFrameSite"
        },
        "imageRequirements": {
          "minWidth": 500,
          "minHeight": 500
        }
      }
    };
  }

  /**
   * Convert legacy frame config format to new format
   */
  convertLegacyConfig(legacyConfig) {
    const config = {};
    Object.keys(legacyConfig).forEach(filename => {
      const specs = legacyConfig[filename];
      config[filename] = {
        FRAME_SIZE: specs.FRAME_SIZE,
        CANVAS_SIZE: specs.CANVAS_SIZE,
        TRANSPARENT_W: specs.TRANSPARENT_W,
        TRANSPARENT_H: specs.TRANSPARENT_H,
        TRANSPARENT_X: specs.TRANSPARENT_X,
        TRANSPARENT_Y: specs.TRANSPARENT_Y
      };
    });
    return config;
  }
}

// Create global instance
window.frameConfigManager = new FrameConfigManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FrameConfigManager;
}
