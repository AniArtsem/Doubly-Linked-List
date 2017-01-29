const Node = require('./node');

class LinkedList {

    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    append(data) {
        this.linkLast(data);

        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    nodeAt(index) {
        let foundNode;
        if (index < this.length / 2) {
            foundNode = this._head;
            for (let i = 0; i < index; i++) {
                foundNode = foundNode.next;
            }
        } else {
            foundNode = this._tail;
            for (let i = this.length - 1; i > index; i--) {
                foundNode = foundNode.prev;
            }
        }

        return foundNode;
    }

    insertAt(index, data) {
        if (index >= 0 && index <= this.length) {
            if (index == this.length) {
                this.linkLast(data);
            } else {
                this.linkBefore(index, data);
            }
        } else throw new Error("Index out of bounds - index: " + index + " size: " + this.length);

        return this;
    }

    linkBefore(index, data) {
        let foundNode = this.nodeAt(index);
        let prev = foundNode.prev;
        let newNode = new Node(data, prev, foundNode);
        foundNode.prev = newNode;
        if (prev == null) {
            this._head = newNode;
        } else {
            prev.next = newNode;
        }
        this.length++;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        let node = this._head;
        while (node != null) {
            let next = node.next;
            LinkedList.clearNode(node);
            node = next;
        }

        this.length = 0;

        return this;
    }

    deleteAt(index) {
        let foundNode = this.nodeAt(index);
        let next = foundNode.next;
        let prev = foundNode.prev;

        if (next == null) {
            this._tail = prev;
        } else {
            next.prev = prev;
            foundNode.next = null;
        }

        if (prev == null) {
            this._head = next;
        } else {
            prev.next = next;
            foundNode.prev = null;
        }

        foundNode.data = null;
        this.length--;

        return this;
    }

    reverse() {
        let temp = this._head;
        let current = this._head;
        this._head = this._tail;
        this._tail = temp;
        while (current != null) {
            let tmp = current.next;
            current.next = current.prev;
            current.prev = tmp;
            current = tmp;
        }

        return this;
    }

    indexOf(data) {
        let index = 0;
        for (let node = this._head; node != null; node = node.next) {
            if (node.data === data) {
                return index;
            } else {
                index++;
            }
        }

        return -1;
    }

    linkLast(data) {
        let l = this._tail;
        let newNode = new Node(data, l, null);
        this._tail = newNode;
        if (l == null) {
            this._head = newNode;
        } else {
            l.next = newNode;
        }
        this.length++;
    }

    linkFirst(data) {
        let l = this._head;
        let newNode = new Node(data, null, l);
        this._head = newNode;
        if (l == null) {
            this._tail = newNode;
        } else {
            l.prev = newNode;
        }
    }

    static clearNode(node) {
        node.next = null;
        node.prev = null;
        node.data = null;
    }
}

module.exports = LinkedList;
