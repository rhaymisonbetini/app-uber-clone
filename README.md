# Cristian Driver
<img class="wp-image-thumb img-responsive minha-classe" src="https://i.ibb.co/DLyN5C3/uber-clone.jpg" width="250" height="550" alt="uber-clone" />

Aplicativo baseado na interface do UBER para estudos do IONIC 4 e da Biblioteca nativa do GoogleMaps do IONIC.

# Como utilizar
Inicialmente você deve cloncar o repositório do código fonte desta aplicação.
Após o clone você deve realizar o cadastro da API do google maps neste link:

<a href="https://github.com/ionic-team/ionic-native-google-maps/blob/master/documents/api_key/generate_api_key.md" target="_blank">Gerar Chave API GoogleMaps </a>

Após gerar a chave no arquivo config.xml voce deve inserir suas chaves no techo abaixo:

```
</widget>
 //outros códigos...
    <preference name="GOOGLE_MAPS_ANDROID_API_KEY" value="" />
    <preference name="GOOGLE_MAPS_IOS_API_KEY" value="" />
</widget>
```
Na home page.ts seu arquivo deve conter a chave tambem no trecho de código abaixo:

```

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: '',
      API_KEY_FOR_BROWSER_DEBUG: ''
    });

```

Após esse procedimento basta rodar o comando: ```npm install ``` e na sequencia dar build com o ```Ionic cordova build android```.

Será gerado um APK que bastando apenas passar para o dispositivo mobile já estara pronto para uso.

Caso queira rodar a aplicação no proprio navegador basta rodar primeiramente o comando:
``` ionic cordova platform add browser``` e nada sequência rodar  ``` ionic cordova run browser ```

# Tecnologias usadas

- IONIC 4
- ANGULAR 8 
- API GOOGLE MAPS IONIC NATIVE ( @ionic-native/google-maps document )

# Desenvolvedor

- Cristian Heleno de Oliveira
