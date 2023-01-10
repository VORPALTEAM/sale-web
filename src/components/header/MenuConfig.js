import { mainHost } from '../../config'

export const styles = {
    default: "default",
    starmap: "starmap",
    sale: "sale"
}

export const menu = [
    {
        name: "Trade",
        url: `${mainHost}/swap`,
        style: styles.default,
        submenu: [{
               name: "Exchange",
               url: `${mainHost}/swap`
             },{
                name: "Liquidity",
                url: `${mainHost}/liquidity`
              }]
    },
    {
        name: "Farms",
        url: `${mainHost}/farms`,
        style: styles.default,
        submenu: []
    },
    {
        name: "Starmap",
        url: `https://starmap.vorpal.finance/`,
        style: styles.starmap,
        submenu: []
    },
    {
        name: "Sale",
        url: `https://sale.vorpal.finance/`,
        style: styles.sale,
        submenu: []
    },
    {
        name: "...",
        url: null,
        style: styles.default,
        submenu: [{
            name: "LitePaper",
            url: `${mainHost}/`
          }, {
            name: "Blog",
            url: "https://vorpaldao.medium.com/"
          }, {
            name: "Twitter",
            url: "https://twitter.com/VorpalDAO"
          }, {
            name: "Linkedin",
            url: "https://www.linkedin.com/company/vorpaldao"
          }, {
            name: "Github",
            url: "https://github.com/VORPALTEAM"
          }, {
            name: "Reddit",
            url: "https://www.reddit.com/user/VorpalDAO"
          }, {
            name: "Youtube",
            url: "https://www.youtube.com/@vorpaldao"
          }, {
            name: "Vimeo",
            url: "https://vimeo.com/vorpaldao"
          }, {
            name: "Discord",
            url: "https://discord.gg/epUsWEPaDA"
          }]
    }
]