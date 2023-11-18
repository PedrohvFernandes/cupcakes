// Infos da geolocalização

import { IGeolocationPosition } from '@pages/location/type-state-geo-location/typings'

const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

// Função de sucesso
const success = (pos: GeolocationPosition) => {
  // O CRD é um objeto que contém informações de localização
  let coords = pos.coords
  // console.log('Your current position is:')
  // console.log(`Latitude : ${coords.latitude}`)
  // console.log(`Longitude: ${coords.longitude}`)
  // console.log(`More or less ${coords.accuracy} meters.`)

  // return <IGeolocationPosition> {
  //   lat: coords.latitude,
  //   lng: coords.longitude,
  //   marker: {
  //     lat: coords.latitude,
  //     lng: coords.longitude
  //   },
  //   accuracy: coords.accuracy
  // }

  // Aqui você pode fazer o que precisa com os dados de geolocalização, por exemplo:
  const responseDataMap = {
    latitude: coords.latitude,
    longitude: coords.longitude,
    accuracy: coords.accuracy
    // Adicione mais propriedades conforme necessário
  }
  // Agora você pode retornar os dados de geolocalização
  return responseDataMap
}

// Função de erro
const errors = (err: GeolocationPositionError) => {
  // Trate os erros aqui
  console.warn(`ERROR(${err.code}): ${err.message}`)
  // Você pode retornar informações de erro relevantes, se necessário
  return {
    errorCode: err.code,
    errorMessage: err.message
  }
}

// Info do maps
const OPTIONS_MAP = {
  CONTAINER_STYLE: {
    width: '100%',
    height: '600px',
    borderRadius: '10px'
  }
}

// Função principal para pegar a geolocalização, que usa as funções success e errors
const getLocation = () => {
  // Verifica se o navegador tem suporte a geolocalização
  if (navigator.geolocation) {
    // Verifica se a permissão já foi dada para o navegador sobre a geolocalização: 'granted' = concedido, 'prompt' = solicitado, 'denied' = negado
    const responseState = navigator.permissions
      .query({ name: 'geolocation' })
      .then((response): Promise<IGeolocationPosition> => {
        // Aqui, a função success agora retorna um objeto com sucesso ou erro, dependendo do resultado
        return new Promise<IGeolocationPosition>(resolve => {
          navigator.geolocation.watchPosition(
            position =>
              resolve({
                responseState: {
                  responseState: response.state
                },
                responseDataMap: {
                  center: {
                    lat: success(position).latitude,
                    lng: success(position).longitude
                  },
                  accuracy: success(position).accuracy
                },
                error: {
                  code: 0,
                  message: ''
                },
                messageGeolocationNotSupportedBrowser: {
                  error: ''
                }
              }),
            error =>
              resolve({
                responseState: {
                  responseState: response.state
                },
                responseDataMap: {
                  center: {
                    lat: 0,
                    lng: 0
                  },
                  accuracy: 0
                },
                error: {
                  code: errors(error).errorCode,
                  message: errors(error).errorMessage
                },
                messageGeolocationNotSupportedBrowser: {
                  error: ''
                }
              }),

            OPTIONS
          )
        })
      })
    return responseState
  } else {
    // Se não for suportado, você pode mostrar uma mensagem para o usuário
    return new Promise<IGeolocationPosition>(resolve => {
      navigator.geolocation.watchPosition(
        () =>
          resolve({
            messageGeolocationNotSupportedBrowser: {
              error: 'A geolocalização não é suportada por este navegador.'
            }
          }),
        () =>
          resolve({
            messageGeolocationNotSupportedBrowser: {
              error: 'A geolocalização não é suportada por este navegador.'
            }
          }),

        OPTIONS
      )
    })
  }
}

// const getLocation = () => {
//   if (navigator.geolocation) {
//     let watchId: number | null = null;

//     const responseState = navigator.permissions
//       .query({ name: 'geolocation' })
//       .then((response): Promise<IGeolocationPosition> => {
//         const responseData = {
//           responseState: {
//             responseState: response.state
//           },
//           responseDataMap: {
//             center: { lat: 0, lng: 0 },
//             accuracy: 0
//           },
//           error: { code: 0, message: '' },
//           messageGeolocationNotSupportedBrowser: { error: '' },
//           cleanup: () => {
//             // Limpe a assinatura quando não for mais necessário (por exemplo, componente desmontado)
//             if (watchId !== null) {
//               navigator.geolocation.clearWatch(watchId);
//             }
//           }
//         };

//         watchId = navigator.geolocation.watchPosition(
//           position => {
//             responseData.responseDataMap.center = {
//               lat: success(position).latitude,
//               lng: success(position).longitude
//             };
//             responseData.responseDataMap.accuracy = success(position).accuracy;
//           },
//           error => {
//             responseData.responseDataMap.center = { lat: 0, lng: 0 };
//             responseData.responseDataMap.accuracy = 0;
//             responseData.error = {
//               code: errors(error).errorCode,
//               message: errors(error).errorMessage
//             };
//           },
//           OPTIONS
//         );

//         return Promise.resolve(responseData);
//       });

//     return responseState;
//   } else {
//     return new Promise<IGeolocationPosition>(resolve => {
//       navigator.geolocation.watchPosition(
//         () =>
//           resolve({
//             messageGeolocationNotSupportedBrowser: {
//               error: 'A geolocalização não é suportada por este navegador.'
//             }
//           }),
//         () =>
//           resolve({
//             messageGeolocationNotSupportedBrowser: {
//               error: 'A geolocalização não é suportada por este navegador.'
//             }
//           }),
//         OPTIONS
//       );
//     });
//   }
// };

// const getLocation = () => {
//   if (navigator.geolocation) {
//     let watchId: number | null = null;
    
//     const responseState = navigator.permissions
//       .query({ name: 'geolocation' })
//       .then((response): Promise<IGeolocationPosition> => {
//         return new Promise<IGeolocationPosition>((resolve, reject) => {
//           const timeoutId = setTimeout(() => {
//             reject({
//               responseState: { responseState: response.state },
//               responseDataMap: { center: { lat: 0, lng: 0 }, accuracy: 0 },
//               error: { code: 0, message: 'Timeout ao obter a localização.' },
//               messageGeolocationNotSupportedBrowser: { error: '' },
//               cleanup: () => {
//                 if (watchId !== null) {
//                   navigator.geolocation.clearWatch(watchId);
//                 }
//               }
//             });
//           }, 10000); // 10 segundos timeout (ajuste conforme necessário)

//           watchId = navigator.geolocation.watchPosition(
//             position => {
//               const accuracy = position.coords.accuracy || 0;

//               // Ajuste a precisão desejada conforme necessário
//               if (accuracy <= 50) {
//                 clearTimeout(timeoutId); // Limpa o timeout, pois alcançou a precisão desejada
//                 resolve({
//                   responseState: { responseState: response.state },
//                   responseDataMap: {
//                     center: {
//                       lat: success(position).latitude,
//                       lng: success(position).longitude
//                     },
//                     accuracy: success(position).accuracy
//                   },
//                   error: { code: 0, message: '' },
//                   messageGeolocationNotSupportedBrowser: { error: '' },
//                   cleanup: () => {
//                     if (watchId !== null) {
//                       navigator.geolocation.clearWatch(watchId);
//                     }
//                   }
//                 });
//               }
//             },
//             error => {
//               reject({
//                 responseState: { responseState: response.state },
//                 responseDataMap: { center: { lat: 0, lng: 0 }, accuracy: 0 },
//                 error: {
//                   code: errors(error).errorCode,
//                   message: errors(error).errorMessage
//                 },
//                 messageGeolocationNotSupportedBrowser: { error: '' },
//                 cleanup: () => {
//                   if (watchId !== null) {
//                     navigator.geolocation.clearWatch(watchId);
//                   }
//                 }
//               });
//             },
//             OPTIONS
//           );
//         });
//       });

//     return responseState;
//   } else {
//     return new Promise<IGeolocationPosition>(resolve => {
//       navigator.geolocation.watchPosition(
//         () =>
//           resolve({
//             messageGeolocationNotSupportedBrowser: {
//               error: 'A geolocalização não é suportada por este navegador.'
//             }
//           }),
//         () =>
//           resolve({
//             messageGeolocationNotSupportedBrowser: {
//               error: 'A geolocalização não é suportada por este navegador.'
//             }
//           }),
//         OPTIONS
//       );
//     });
//   }
// };

const useGetGeolocationMaps = () => {
  return {
    OPTIONS_MAP,
    // success,
    // errors,
    getLocation
  }
}

export default useGetGeolocationMaps
