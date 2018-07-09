# [anticore](../../../../../#reference)/[dom](../../#reference)/[tree](../#reference)/<a name="reference">update</a>

## Usage

```js
update(element, config)
```

## Valid config properties

* `text`: text content of the element
* `parent`: parent node, useful to modify the node and to append it at once
* `next`: next node, useful to modify the node and to insert it before the next node at once
* `prev`: previous node, useful to modify the node and to insert it after the previous node at once
* `dataset`: object to declare `data-*` attributes
* `style`: object to declare the style properties
* `*`: declare any attribute... or declare a listener if the property is prefixed by `on`, like `onClick`

## Example
```js
update(element, {
  text: 'this is the text content',
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
