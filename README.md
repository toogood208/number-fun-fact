## Description
This api takes a number and a return a funfact about the number

## Enpoint
```bash
https://number-fun-fact.vercel.app/api/classify-number?number=98
```

## Successful Response
```bash
{
  "number": 98,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
    "even"
  ],
  "digit_sum": 17,
  "fun_fact": "98 is the smallest number with the property that its first 5 multiples contain the digit 9."
}
```

## Error Response
```bash
{
  "number": "alpahbet",
  "error": true
}
```
