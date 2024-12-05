# Framework Build System
This document outlines the usage and features of the build syste,

### Building Resources
The build system is designed to streamline the process of building server resources

**Running the Build System**
```bash
yarn build
```

**Build Arguments**
The build system supports several arguments to customize the build process:
* `--w` or `--watch`: Enables watch mode, automatically rebuilding resources upon detecting changes.
* `--target=resource`: Specifies the target resource(s) to build. Multiple resources can be specified by separating their names with a forward slash (e.g, `--target=resource1/resource2/resource3`)
* `--skipweb`: Skip all Vite builds, which can be useful to improve build times when UI builds are not necessary

### CLI Tool
The `yarn tools` script provides a command-line interface with various helpful utilities:
1. Build All Resources: Builds all resources that the build system can identify.
2. Start Web Server: Identifies all web resources and presents a list, allowing you to easily start a local development server for them.
3. Download CFX Artifacts: Downloads the latest CFX server artifacts and stores them in a "cfx" directory at the root of your project.
4. Generate server config: Analyzes your server.yaml and environment variables to generate a server configuration file.
5. Generate start.bat: Automatically creates a start.bat script to launch your FiveM server.
6. Configure asset links: Sets up junction links for assets like maps and vehicles, based on the configuration in your server.yaml.

The CLI tool aims to somplify common server management tasks and improve development workflow.
