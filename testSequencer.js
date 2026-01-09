const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    return tests.sort((a, b) => {
      const aNum = parseInt(a.path.match(/(\d+)_/)[1], 10);
      const bNum = parseInt(b.path.match(/(\d+)_/)[1], 10);
      return aNum - bNum;
    });
  }
}

module.exports = CustomSequencer;
