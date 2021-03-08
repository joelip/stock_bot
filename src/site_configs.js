class SiteConfig {
  constructor(url, channelName, itemName, selectors) {
    this.url = url;
    this.channelName = channelName;
    this.itemName = itemName;
    this.selectors = selectors;
    this.hasSentMessage = false;
  }

  changedMessage() {
    return `The status of ${this.itemName} has changed. Check ${this.url}.`;
  }
}

module.exports = {
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
    }
  ),
};
