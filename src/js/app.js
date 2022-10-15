import * as flsFunctions from "./files/functions.js";
import * as flsSimple from './files/simple.js';
import * as flsProducts from './files/products.js';
import {slider} from './files/sliders.js';

flsSimple.isWebp();
flsSimple.videoClick();
slider();

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

flsProducts.products();
flsProducts.shoppingCartDelete();