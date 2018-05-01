export const queue = []

queue.next = function () {
  queue.shift()

  if (queue.length) {
    queue[0].fetchRequest()
  }
}