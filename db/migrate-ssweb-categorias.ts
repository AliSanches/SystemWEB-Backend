const categorias = [
    {"cat_cod":"4","cat_tipo":"B-41","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA POR IDADE","cat_descricao":"<p>A aposentadoria por idade<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-user-check","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"5","cat_tipo":"B-42","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-user-clock","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"6","cat_tipo":"B-46","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA ESPECIAL","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-user-cog","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"7","cat_tipo":"IPASP","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA IPASP","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-user-shield","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"8","cat_tipo":"B-21","cat_pai":"50","cat_ordem":null,"cat_titulo":"PENSÃO POR MORTE","cat_descricao":"<p>a<\/p>","cat_codigo":null,"cat_icone":"fas fa-user-minus","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"10","cat_tipo":"B-31","cat_pai":null,"cat_ordem":null,"cat_titulo":"BENEFICIOS POR INCAPACIDADE","cat_descricao":"<p>TEXTO<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-procedures","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"11","cat_tipo":"B-07","cat_pai":"4","cat_ordem":null,"cat_titulo":"POR IDADE - RURAL","cat_descricao":"<p>TESTE<\/p>","cat_codigo":null,"cat_icone":"fas fa-tractor","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"12","cat_tipo":"NORMAS","cat_pai":"6","cat_ordem":null,"cat_titulo":"NORMAS E OBSERVAÇÕES QUE REGEM AS ESPECIALIDADES","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-tasks","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"14","cat_tipo":"BPC","cat_pai":null,"cat_ordem":null,"cat_titulo":"BPC","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-users","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"15","cat_tipo":"B-88","cat_pai":"14","cat_ordem":null,"cat_titulo":"AMPARO SOCIAL AO IDOSO","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-blind","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"16","cat_tipo":"B-87","cat_pai":"14","cat_ordem":null,"cat_titulo":"AMPARO SOCIAL AO DEFICIENTE","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-wheelchair","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"17","cat_tipo":"ACUMULAÇÃO DE BENEFÍCIOS","cat_pai":null,"cat_ordem":null,"cat_titulo":"ACUMULAÇÃO DE BENEFÍCIOS","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-user-plus","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"21","cat_tipo":"TEMPO RURAL ","cat_pai":null,"cat_ordem":null,"cat_titulo":"TEMPO RURAL ATÉ E APÓS 30\/10\/1991 - INDENIZAÇÃO","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"far fa-clock","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"22","cat_tipo":"PAGAMENTO EM ATRASO OU INDENIZAÇÃO","cat_pai":null,"cat_ordem":null,"cat_titulo":"PAGAMENTO EM ATRASO OU INDENIZAÇÃO","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-comments-dollar","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"23","cat_tipo":"B-80","cat_pai":null,"cat_ordem":null,"cat_titulo":"SALÁRIO MATERNIDADE","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-heart","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"25","cat_tipo":"LEIS","cat_pai":null,"cat_ordem":null,"cat_titulo":"LEIS","cat_descricao":"<p>TEXTO<\/p>","cat_codigo":null,"cat_icone":"fas fa-balance-scale","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"26","cat_tipo":"B-87","cat_pai":"16","cat_ordem":null,"cat_titulo":"BPC INFANTIL","cat_descricao":"<p><font style=\"vertical-align: inherit;\"><font style=\"vertical-align: inherit;\">TESTE<\/font><\/font><\/p>","cat_codigo":null,"cat_icone":"far fa-grin-stars","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"28","cat_tipo":"DEFICIENTE","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA DO DEFICIENTE","cat_descricao":"<br>","cat_codigo":null,"cat_icone":"fab fa-accessible-icon","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"34","cat_tipo":"APOSENTADORIAS","cat_pai":null,"cat_ordem":null,"cat_titulo":"APOSENTADORIAS","cat_descricao":"<p>APOSENTADORIAS<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-restroom","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"35","cat_tipo":"B-41","cat_pai":"28","cat_ordem":null,"cat_titulo":"POR IDADE DA PESSOA COM DEFICIÊNCIA ","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-wheelchair","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"36","cat_tipo":"B-42","cat_pai":"28","cat_ordem":null,"cat_titulo":"POR TEMPO DE CONTRIBUIÇÃO DA PESSOA COM DEFICIÊNCIA","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-user-plus","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"37","cat_tipo":"B-41","cat_pai":"4","cat_ordem":null,"cat_titulo":"POR IDADE - URBANA ","cat_descricao":"<br><b style=\"mso-bidi-font-weight:normal\"><u><span style=\"font-size:14.0pt;line-height:106%;font-family:&quot;Swis721 Cn BT&quot;,sans-serif;\r\nmso-fareast-font-family:Calibri;mso-fareast-theme-font:minor-latin;mso-bidi-font-family:\r\nCalibri;mso-bidi-theme-font:minor-latin;mso-ansi-language:PT-BR;mso-fareast-language:\r\nEN-US;mso-bidi-language:AR-SA\"><\/span><\/u><\/b><b style=\"mso-bidi-font-weight:normal\"><span style=\"font-size: 18pt; line-height: 106%; font-family: &quot;Arial&quot;; color: rgb(0, 32, 96);\"><\/span><\/b>\r\n\r\n<p align=\"center\"><!--[if gte mso 9]><xml>\r\n <o:OfficeDocumentSettings>\r\n  <o:AllowPNG\/>\r\n <\/o:OfficeDocumentSettings>\r\n<\/xml><![endif]--><!--[if gte mso 9]><xml>\r\n <w:WordDocument>\r\n  <w:View>Normal<\/w:View>\r\n  <w:Zoom>0<\/w:Zoom>\r\n  <w:TrackMoves\/>\r\n  <w:TrackFormatting\/>\r\n  <w:HyphenationZone>21<\/w:HyphenationZone>\r\n  <w:PunctuationKerning\/>\r\n  <w:ValidateAgainstSchemas\/>\r\n  <w:SaveIfXMLInvalid>false<\/w:SaveIfXMLInvalid>\r\n  <w:IgnoreMixedContent>false<\/w:IgnoreMixedContent>\r\n  <w:AlwaysShowPlaceholderText>false<\/w:AlwaysShowPlaceholderText>\r\n  <w:DoNotPromoteQF\/>\r\n  <w:LidThemeOther>PT-BR<\/w:LidThemeOther>\r\n  <w:LidThemeAsian>X-NONE<\/w:LidThemeAsian>\r\n  <w:LidThemeComplexScript>X-NONE<\/w:LidThemeComplexScript>\r\n  <w:Compatibility>\r\n   <w:BreakWrappedTables\/>\r\n   <w:SnapToGridInCell\/>\r\n   <w:WrapTextWithPunct\/>\r\n   <w:UseAsianBreakRules\/>\r\n   <w:DontGrowAutofit\/>\r\n   <w:SplitPgBreakAndParaMark\/>\r\n   <w:EnableOpenTypeKerning\/>\r\n   <w:DontFlipMirrorIndents\/>\r\n   <w:OverrideTableStyleHps\/>\r\n  <\/w:Compatibility>\r\n  <m:mathPr>\r\n   <m:mathFont m:val=\"Cambria Math\"\/>\r\n   <m:brkBin m:val=\"before\"\/>\r\n   <m:brkBinSub m:val=\"--\"\/>\r\n   <m:smallFrac m:val=\"off\"\/>\r\n   <m:dispDef\/>\r\n   <m:lMargin m:val=\"0\"\/>\r\n   <m:rMargin m:val=\"0\"\/>\r\n   <m:defJc m:val=\"centerGroup\"\/>\r\n   <m:wrapIndent m:val=\"1440\"\/>\r\n   <m:intLim m:val=\"subSup\"\/>\r\n   <m:naryLim m:val=\"undOvr\"\/>\r\n  <\/m:mathPr><\/w:WordDocument>\r\n<\/xml><![endif]--><\/p>","cat_codigo":null,"cat_icone":"fas fa-hotel","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"38","cat_tipo":"B-41","cat_pai":"4","cat_ordem":null,"cat_titulo":"POR IDADE - HÍBRIDA","cat_descricao":null,"cat_codigo":null,"cat_icone":"fas fa-hospital-symbol","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"39","cat_tipo":"B-57","cat_pai":"34","cat_ordem":null,"cat_titulo":"APOSENTADORIA DO PROFESSOR","cat_descricao":"<p>TESTE<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-user-graduate","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"40","cat_tipo":"B-94 E B-36","cat_pai":"10","cat_ordem":null,"cat_titulo":"AUXILIO-ACIDENTE","cat_descricao":"<p>TESTE<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-user-times","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"41","cat_tipo":"B-31 E  B-32","cat_pai":"10","cat_ordem":null,"cat_titulo":"AUXILIO-DOENÇA","cat_descricao":"<p>TEXTO<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-user-injured","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"44","cat_tipo":"DIVERSOS","cat_pai":null,"cat_ordem":null,"cat_titulo":"DIVERSOS","cat_descricao":"<p>TESTE<br><\/p>","cat_codigo":null,"cat_icone":"fab fa-dochub","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"45","cat_tipo":"APOSENTADORIA INVALIDEZ","cat_pai":"10","cat_ordem":null,"cat_titulo":"APOSENTADORIA POR INCAPACIDADE ","cat_descricao":"<p>TESTE<br><\/p>","cat_codigo":null,"cat_icone":"fas fa-user-slash","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"47","cat_tipo":"1","cat_pai":null,"cat_ordem":null,"cat_titulo":"COLABORADORES","cat_descricao":"<p>INFORMAÇÕES PARA OS COLABORADORES DE FORMA INDIVIDUALIZADA.<\/p>","cat_codigo":null,"cat_icone":"fas fa-user-friends","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"48","cat_tipo":"1","cat_pai":"47","cat_ordem":null,"cat_titulo":"RODRIGO","cat_descricao":"<p>A<\/p>","cat_codigo":null,"cat_icone":"fas fa-book-reader","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"49","cat_tipo":"1","cat_pai":null,"cat_ordem":null,"cat_titulo":"PLANEJAMENTO PREVIDENCIÁRIO - OPÇÃO POR QUAL BENEFÍCIO","cat_descricao":"<p>1<\/p>","cat_codigo":null,"cat_icone":"far fa-handshake","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"50","cat_tipo":"B-21","cat_pai":null,"cat_ordem":null,"cat_titulo":"PENSÃO POR MORTE","cat_descricao":"<p>A<\/p>","cat_codigo":null,"cat_icone":"fas fa-skull","cat_prioridade":null,"cat_antigo_cod":null},
    {"cat_cod":"51","cat_tipo":"1","cat_pai":null,"cat_ordem":null,"cat_titulo":"* COMUNICADOS IMPORTANTES","cat_descricao":null,"cat_codigo":null,"cat_icone":"far fa-address-book","cat_prioridade":null,"cat_antigo_cod":null}
]

import prismaClient from "./prismaClient";

const migration = async () => {
    try {
        let modificados: any[] = []

        for (let cat in categorias) {
            let categoria = categorias[cat]

            let query = await prismaClient.wiki_categoria.create({
                data: {
                    id: +categoria.cat_cod,
                    titulo: categoria.cat_titulo,
                    descricao: categoria.cat_descricao,
                }
            })

            modificados.push(query)
        }

        console.log(modificados.length + " categorias modificadas")
    } catch (err) {
        console.log(err)
    }
}

migration();