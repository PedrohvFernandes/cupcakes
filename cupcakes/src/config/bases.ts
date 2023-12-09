import { isDev } from "@utils/isDev"

export default {
  cupcakes: {
    baseUrls: {
      apiProducts: isDev
        ? import.meta.env.VITE_API_PRODUCTS_CUPCAKES_URL_TEST as string
        : import.meta.env.VITE_API_PRODUCTS_CUPCAKES_URL_LIVE as string,
    },
    gitHub: {
      baseUrls: {
        perfil: 'https://github.com/PedrohvFernandes',
        repositories: 'https://github.com/PedrohvFernandes?tab=repositories'
      },
      target: {
        blank: '_blank',
        parent: '_parent'
      }
    },
    google: {
      baseUrls: {
        androidDeviceLocationSettings:
          ' https://support.google.com/accounts/answer/3467281?hl=pt-BR',
        appleDeviceLocationSettings:
          'https://support.apple.com/pt-br/guide/iphone/iph3dd5f9be/ios#:~:text=Acesse%20Ajustes%20>%20Privacidade%20e%20Segurança%20>%20Serviços%20de%20Localização.',
        pcLocationSettings:
          'https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=pt-BR',
        stepByStepToEnableLocation:
          'https://www.ailos.coop.br/wp-content/uploads/2023/01/Passo-a-passo-HabilitacaoLocalizacaoCO-Ailos.pdf',
        clearCacheCookiesChrome:
          'https://support.google.com/accounts/answer/32050?hl=pt-BR&co=GENIE.Platform%3DAndroid',
        clearCacheCookiesFirefox:
          'https://support.mozilla.org/pt-BR/kb/limpe-cookies-e-dados-de-sites-no-firefox',
        clearCacheCookiesFirefoxAndroid:
          'https://support.mozilla.org/pt-BR/kb/limpe-historico-de-pesquisa-firefox-android',
        clearCacheFirefox:
          'https://support.mozilla.org/pt-BR/kb/como-limpar-cache-firefox'
      },
      target: {
        blank: '_blank',
        parent: '_parent'
      }
    }
  }
}
