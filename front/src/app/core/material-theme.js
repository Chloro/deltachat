module.exports = /*@ngInject*/ function(
    $mdThemingProvider
) {

  // $mdThemingProvider.definePalette('commandline', {
  //   '50': '000000',
  //   '100': '000000',
  //   '200': '808080',
  //   '300': '000000',
  //   '400': '000000',
  //   '500': '000000',
  //   '600': '000000',
  //   '700': '000000',
  //   '800': '000000',
  //   '900': '000000',
  //   'A100': '000000',
  //   'A200': '000000',
  //   'A400': '000000',
  //   'A700': '000000',
  //   'contrastDefaultColor': 'light',
  //   'contrastDarkColors': [
  //     '50',
  //     '100',
  //     '200',
  //     'A100',
  //     'A200'
  //   ],
  //   'contrastLightColors': [
  //     '300',
  //     '400',
  //     '500',
  //     '600',
  //     '700',
  //     '800',
  //     '900',
  //     'A400',
  //     'A700'
  //   ]
  // });
  //
  // $mdThemingProvider.theme('default')
  //   .primaryPalette('commandline');

  $mdThemingProvider.definePalette('black', {
    '50': '000000',
    '100': '000000',
    '200': '000000',
    '300': '000000',
    '400': '000000',
    '500': '000000',
    '600': '000000',
    '700': '000000',
    '800': '000000',
    '900': '000000',
    'A100': '000000',
    'A200': '000000',
    'A400': '000000',
    'A700': '000000',
    'contrastDefaultColor': 'light'
  });
  $mdThemingProvider.definePalette('white', {
    '50': 'ffffff',
    '100': 'ffffff',
    '200': 'ffffff',
    '300': 'ffffff',
    '400': 'ffffff',
    '500': 'ffffff',
    '600': 'ffffff',
    '700': 'ffffff',
    '800': 'ffffff',
    '900': 'ffffff',
    'A100': 'ffffff',
    'A200': 'ffffff',
    'A400': 'ffffff',
    'A700': 'ffffff',
    'contrastDefaultColor': 'dark'
  });

  $mdThemingProvider.theme('default')
    .primaryPalette('black')
    .backgroundPalette('white');

};