# [anticore](../../../../../#reference)/[dom](../../#reference)/[tree](../#reference)/<a name="reference">update</a>

## Usage

```js
update(element, config)
```

## Example
```js
update(element, {
  text: 'this is the text content',
  parent: document.body,
  next: one('main'),
  dataset: {
    id: 123
  },
  style: {
    color: 'red'
  },
  title: 'this is the title attribute content',
  onClick: function (event) {
    console.log('click on', event.target);
  }
})
```
