() => {

  let tasks = Object.assign({}, { counter: 0 });
  
  const getTask = function(name) {
    if (tasks[name]) return tasks[name];
    tasks[name] = {
      name,
      openedAt: null,
      lastMarkAt: null,
      stoppedAt: null,
      marks: [],
      open(label) {
        const now = new Date();
        this.openedAt = now;
        this.lastMarkAt = now;
        this.stoppedAt = null;
        this.marks = [];
        this.order = tasks.counter++;
        if(label) this.mark(label);
        return this;
      },
      mark(label) {
        const now = new Date();
        this.marks.push({
          label,
          fromLast: now - this.lastMarkAt,
          fromStart: now - this.openedAt
        });
        this.lastMarkAt = now;
        return this;
      },
      stop(label) {
        if(label) this.mark(label);
        this.stoppedAt = new Date();
        return this;
      },
    };
    return tasks[name];
  }

  getTask.export = function () {
    return Object.values(tasks).map(task => ({
      name: task.name,
      fromStart: task.stoppedAt - task.openedAt,
      marks: (task.marks || []).map(it => `·${it.fromStart} | +${it.fromLast} | #${it.label}`),
    }));
  };

  getTask.print = function () {
    const out = getTask.export();
    return console.log(JSON.stringify(out, null, 2)) || out;
  };

  getTask.reset = function () {
    tasks = Object.assign({}, { counter: 0 });
  };

  return getTask;

}