module.exports = function timeThreshold(opts) {
  if (typeof opts === 'number') {
    opts = { duration: opts }
  }

  var time = Date.now()
  var duration = +opts.duration || 1000
  var threshold = Math.max(+opts.threshold || 1000 * 10, duration)

  return function timeThreshold(req, res, next) {
    var acc = calculate()
    var offset = threshold - acc

    if (acc > threshold) {
      time = Date.now()
      return next(null, false)
    }

    next(null, offset > duration)
  }

  function calculate() {
    var now = Date.now()
    var diff = now - time
    return diff - duration
  }
}