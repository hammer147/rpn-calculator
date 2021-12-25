# Notes

## SyntheticEvent and Pooling

Event handlers will be passed instances of SyntheticEvent.
SyntheticEvent is a cross-browser wrapper around the browser’s native event.

- same interface as the browser’s native event
- events work identically across all browsers
- SyntheticEvent is pooled for performance reasons

Pooling means that the SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked. As such, you cannot access the event in an asynchronous way.

This is not a problem, just store the values on the event that you need in a variable, and use that variable in your async code (e.g. in setState)

## weird decimal calculations

examples:
0.1 + 0.2 = 0.30000000000000004
10.10 + 10.20 = 20.299999999999997

This is due to the representation of floating point numbers in binary.
to look into... maybe rounding to 14 decimals can help....

```js
const roundNumber = (number: number, decimals: number): number => {
  const d = 10 ** decimals
  return Math.round((number + Number.EPSILON) * d) / d
}
```

[blog post](https://medium.com/@DominicCarmel/understanding-javascripts-weird-decimal-calculations-e65f0e1adefb)
