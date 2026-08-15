module.exports = $moduler.import(["@/dist/www/dev/settings/publicable.json"], async function ([publicable]) {
    return {
        // Aquí el import bruto inicial:
        ...publicable,
        // Aquí los fine-grained para cada property especial:
        sectionsMap: Object.assign({
            // Aquí puedes poner secciones solo para el moduler (dist/www/dev/settings) y no el devbinary (dev/settings):
            "#SomeSection": "@/dist/www/all/SomeSection.js"
        }, publicable.sectionsMap || {}),
    }
});