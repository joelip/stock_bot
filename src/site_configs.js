class SiteConfig {
  constructor(url, channelName, itemName, selectors, outOfStockString) {
    this.url = url;
    this.channelName = channelName;
    this.itemName = itemName;
    this.selectors = selectors;
    this.outOfStockString = outOfStockString;
    this.hasSentMessage = false;
  }

  changedMessage() {
    return `The status of ${this.itemName} has changed. Check ${this.url}.`;
  }
}

module.exports = {
  bestbuyps5digital: new SiteConfig(
    'https://www.bestbuy.com/site/sony-playstation-5-digital-edition-console/6430161.p?skuId=6430161',
    '#other',
    'Best Buy PS5 Digital',
    {
      stockAvailabilityContainer:
        '.fulfillment-add-to-cart-button button',
    },
    'Sold Out'
  ),
  bestbuyps5disc: new SiteConfig(
    'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149',
    '#other',
    'Best Buy PS5 Disc',
    {
      stockAvailabilityContainer:
        '.fulfillment-add-to-cart-button button',
    },
    'Sold Out'
  ),
  topShot: new SiteConfig(
    'https://www.nbatopshot.com/packs',
    '#nba-top-shot',
    '"sold out" packs'
  ),
  roguePlates: new SiteConfig(
    'https://www.roguefitness.com/rogue-lb-change-plates',
    '#rogue',
    'Rogue Change Plates',
    {
      stockAvailabilityContainer:
        '.product-purchase-wrapper-24535 .bin-stock-availability',
    },
    'Notify Me'
  ),
  elgatoRingLight: new SiteConfig(
    'https://www.elgato.com/en/ring-light#',
    '#other',
    'Elgato Ring Light Base',
    {
      stockAvailabilityContainer:
        '[data-id="529bc7c2-7ff1-4b70-824a-3839d425a0ac"] .inner-text',
    },
    'Out of stock'
  ),
};
