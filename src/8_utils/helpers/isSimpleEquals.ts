import Handlebars from "handlebars";

Handlebars.registerHelper("isSimpleEquals", function (v1, v2) {
  return Boolean(v1 === v2);
});
