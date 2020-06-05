import React, { useState, useEffect, Fragment } from 'react';

const LinkedList = () => {
  const [head, setList] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    displayList();
  }, [head]);

  const appendNode = () => {
    if (!head) {
      setList(createNode(generateRandomNumber()));
    }
    else {
      let looper = head;
      let newHead = looper;
      while (looper.next) {
        looper = looper.next;
      }
      looper.next = createNode(generateRandomNumber(), null, looper);
      setList(newHead);
    }
    setSize(size + 1);
  };

  const insertAtHead = () => {
    if (!head) {
      setList(createNode(generateRandomNumber()));
    }
    else {
      let newNode = createNode(generateRandomNumber(), head, null);
      head.prev = newNode;
      setList(newNode);
    }
    setSize(size + 1);
  }

  const deleteNode = (id) => {
    let looper = head;
    let newHead = looper;
    let prevNode = '';
    let nextNode = '';
    while (looper) {
      if (looper.timestamp === Number(id)) {
        prevNode = looper.prev;
        nextNode = looper.next;
        if (prevNode && nextNode) { // deleting item in the middle
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
          setList(newHead);
        }
        else {
          if (!prevNode) { // deleting the first item
            setList(nextNode);
          }
          else { // deleting the last item
            prevNode.next = null;
            setList(newHead);
          }
        }
        setSize(size - 1);
        return;
      }
      looper = looper.next;
    }
  }

  const displayList = () => {
    let elements = [];
    let looper = head;
    while (looper) {
      elements.push(
        <li key={looper.timestamp} id={looper.timestamp} onClick={e => deleteNode(e.target.id)}>{looper.value}</li>
      );
      looper = looper.next;
    };
    return (
      <ul>
        {elements}
      </ul>
    );
  }

  return (
    <Fragment>
      <h1>{`Total items: ${size}`}</h1>
      <p>Click an item to delete</p>
      <div>
        <button onClick={() => insertAtHead()}>insertAtHead(): adds node at beginning</button>
        <button onClick={() => appendNode()}>appendNode(): adds node at end</button>
        {displayList()}
      </div>
    </Fragment>
  );
};

const createNode = (v, n = null, p = null) => {
  return {
    value: v,
    next: n,
    prev: p,
    timestamp: Date.now(),
  };
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
}

export default LinkedList;