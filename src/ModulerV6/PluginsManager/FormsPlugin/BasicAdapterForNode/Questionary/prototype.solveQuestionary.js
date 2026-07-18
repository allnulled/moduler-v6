/**
 * @name ModulerV6.PluginsManager.FormsPlugin.BasicAdapterForNode.prototype.solveQuestionary
 * @type 
 * @description 
 */
async solveQuestionary() {
  const questions = this.questions;
  const { terminal: term } = require("terminal-kit");
  const fs = require("fs");
  const os = require("os");
  const path = require("path");
  const cp = require("child_process");
  const answers = questions.map(q => q.byDefault);
  const formattedAnswers = questions.reduce((out, q, i) => {
    out[i] = this.formatType(q.byDefault, q.parameters.type);
    return out;
  }, {});
  this.extendTerminalKit(term);
  const editQuestion = async (index) => {
    let isValid = false;
    const question = questions[index];
    // console.log(question);
    // await require("timers/promises").setTimeout(1000 * 4);
    const filename = path.join(os.tmpdir(), `questionary-${process.pid}.txt`);
    fs.writeFileSync(filename, answers[index], "utf8");
    term.turnOff();
    const editor = process.env.VISUAL || process.env.EDITOR || "vim" || "code";
    let value = answers[index];
    while (!isValid) {
      cp.spawnSync(editor, [filename], { stdio: "inherit" });
      value = fs.readFileSync(filename, "utf8");
      const questionType = question.parameters.type;
      try {
        const formatted = await this.formatType(value, question.parameters.type || null);
        formattedAnswers[index] = formatted;
        isValid = true;
      } catch (error) {
        isValid = false;
        console.log(error);
        await require("timers/promises").setTimeout(1000 * 2);
      }
    }
    answers[index] = value
    fs.unlinkSync(filename);
    term.turnOn();
  };
  term.turnOn();
  while (true) {
    term.clear();
    console.log("[*] Formulario [*]");
    const items = questions.map((q, i) => {
      return `Pregunta ${i + 1}: ${q.parameters.description} [${JSON.stringify(i in formattedAnswers ? formattedAnswers[i] : answers[i])}]`;
    });
    items.push("Salir");
    const menu = await term.singleColumnMenu(items).promise;
    if (menu.selectedIndex === items.length - 1) {
      break;
    }
    await editQuestion(menu.selectedIndex);
  }
  term.turnOff();
  term.clear();
  return answers.map((answer, index) => this.formatType(answer, questions[index].parameters.type));
}