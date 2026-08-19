let isRunning = false;
let timerId = null;

self.onmessage = (event) => {
  console.log("Mensagem recebida do main thread: ", event.data);

  const state = event.data;

  if (!state || !state.activeTask) {
    console.log("Worker: nenhuma tarefa ativa, ignorando.");
    return;
  }

  if (isRunning) return;
  isRunning = true;

  const { activeTask } = state;
  const endDate = activeTask.startDate + activeTask.duration * 1000;

  function tick() {
    const now = Date.now();
    const countDownSeconds = Math.floor((endDate - now) / 1000);
    self.postMessage(countDownSeconds);

    if (countDownSeconds <= 0) {
      isRunning = false;
      return;
    }

    timerId = setTimeout(tick, 1000);
  }

  tick();
};
