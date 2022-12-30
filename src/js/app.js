import * as flsFunctions from "./files/functions.js";
import * as flsSimple from './files/simple.js';
import * as flsProducts from './files/products.js';
import * as flsPrices from './files/prices.js';
import {slider, productSlider} from './files/sliders.js';
import quiz from './files/quiz.js';
import articles from "./files/articles.js";
import map from "./files/map.js";

flsSimple.isWebp();
flsSimple.citiesSelect();
slider();
productSlider();
quiz();
articles();
map();

flsFunctions.mediaAdaptive();
flsFunctions.dropdown();
flsFunctions.tab();
flsFunctions.select();
flsFunctions.burger();
flsFunctions.popup();
flsFunctions.maskNumber();
flsFunctions.validateForm();
flsFunctions.fixedHeader();
flsFunctions.video();
flsFunctions.spollers();
flsFunctions.range();
flsFunctions.show();
flsFunctions.openFilter();
flsFunctions.filesInputs();

flsProducts.products();
flsProducts.sortingProducts();

flsPrices.waterproofingSetting();