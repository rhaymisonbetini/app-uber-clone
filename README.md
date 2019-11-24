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
