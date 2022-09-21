const fs = require('fs');
const path = require('path');

const copyDir = () => {
    try {
        fsPromises.mkdir(__dirname, { recursive: true })
    } catch (err) {
        console.error(err.message);
      }
}