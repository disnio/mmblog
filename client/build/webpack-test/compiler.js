const Compiler = require('webpack').Compiler

// Create a new compiler instance
const compiler = new Compiler()

// Populate all required options
compiler.options = {}

// Creating a plugin.
class LogPlugin {
  apply (compiler) {
    compiler.plugin('should-emit', compilation => {
      console.log('should I emit?')
      return true
    })
  }
}

// Apply the compiler to the plugin
new LogPlugin().apply(compiler)

/* Add other supporting plugins */

// Callback to be executed after run is complete
const callback = (err, stats) => {
  console.log('Compiler has finished execution.')
  // Display stats...
}

// call run on the compiler along with the callback
compiler.run(callback)