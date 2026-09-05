module.exports = async function ({ assert: assertLoudly, utils, compilerV6, modulerV6, devBinaryV6, injection }) {

  const assert = assertLoudly || compilerV6.createAssertFunction() || assertLoudly;

  Primero_comprueba_que_el_parser_ha_asimilado_la_nueva_formula_con_funciones: {
    const parser = modulerV6.constructor.Parser.create([
      ["<", function({ state, countingFrom, text, parser, }) {
        let pos;
        Find_end_of_token_somehow: {
          pos = text.indexOf(">", countingFrom);
        }
        Ensure_it_ends: {
          if(pos === -1) throw new Error("Unclosed expression starting with «<» which misses its «>»");
        }
        Push_token: {
          parser._pushToken({ starter: "<", state, countingFrom, text, currentPosition: pos, enderLength: ">".length, extraOffset: 0 });
        }
        Update_state_position: {
          state.position = pos + (">".length);
        }
      }],
    ]);
    const out = parser.parse("Texto con <tags> tipo <html>");
    assert(out.tokens.length === 2, "Can get functions as grammar enders (1)");
    assert(out.tokens[0].type === "<", "Can get functions as grammar enders (11)");
    assert(out.tokens[0].inner === "tags", "Can get functions as grammar enders (12)");
    assert(out.tokens[1].type === "<", "Can get functions as grammar enders (31)");
    assert(out.tokens[1].inner === "html", "Can get functions as grammar enders (32)");
  }

  Ejemplo_de_compilacion_con_desbalance_de_parentesis: {
    const devbin1 = devBinaryV6.constructor.create(`${__dirname}/../assets/unit/417`);
    const compilation1 = await devbin1.compiler.compile("@/main.js");
    assert("@/main.js" in compilation1.report.tree, "Can compile recursively still with unbalanced parenthesys inside $moduler.import callback (1)");
    assert("@/local.1.js" in compilation1.report.tree, "Can compile recursively still with unbalanced parenthesys inside $moduler.import callback (2)");
    assert("@/local.2.js" in compilation1.report.tree, "Can compile recursively still with unbalanced parenthesys inside $moduler.import callback (3)");
  }

  compilerV6._logger.log("Test 417 ok");
};