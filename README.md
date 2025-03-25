# Custom Vision React App

Este projeto é um aplicativo em React que utiliza o serviço **Custom Vision** da Microsoft Azure para classificar imagens.

## 🚀 Tecnologias

- React
- Azure Custom Vision API
- Axios

## 📦 Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/custom-vision-react.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd custom-vision-react
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```

## 🔑 Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves da **Azure Custom Vision API**:
   ```env
   PREDICTION_ENDPOINT= "sua-url-da-api"
   PREDICTION_KEY= "sua-chave-de-predição"
   ```

## ▶️ Uso

1. Inicie o servidor de desenvolvimento:
   ```sh
   npm starun dev
   ```
2. Acesse `http://localhost:5173/` no seu navegador.
3. Faça o upload de uma imagem para classificá-la com o modelo treinado no **Custom Vision**.

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para utilizá-lo e modificá-lo!

