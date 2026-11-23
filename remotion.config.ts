import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(80);
Config.setCrf(23);
Config.setConcurrency(2);
Config.setCodec('h264');
Config.setOverwriteOutput(true);
// Untuk scene 3D (WebGL) di runner tanpa GPU.
Config.setChromiumOpenGlRenderer('swangle');
