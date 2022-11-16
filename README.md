# motion-fe

Frontend para consulta de arquivos gerados por detecção de movimento 

## Dependências:

* Motion Project: https://motion-project.github.io/
* http-server: https://www.npmjs.com/package/http-server

## Configuração

1. Instale e configure o Motion
   - A pasta onde o motion deve salvar as imagens deve ser a pasta *motion-images* 
   - O nome das imagens e vídeos deve seguir o padrão *%Y%m%d-%v*
      - No arquivo motion.conf modificar as linhas:
      ``` 
      target_dir /path/to/dir/motion-images
      picture_filename %Y%m%d-%v
      picture_output best
      movie_filename %Y%m%d-%v
      ```
2. Instale o http-server
   - ``` bash$ npm install -g http-server ```
   - Criar os certificados para uso de https se for o caso
      - ``` bash$ openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem ```
3. Na raiz deste projeto execute o servidor
   - ``` bash$ http-server ```

## Deploy|Autostart

1. Incluir todo o conteúdo deste projeto na pasta de deploy que será publicada pelo http-server
2. NÃO incluir as pastas motion-images nem conf
3. Criar um link simbólico chamado motion-images para a pasta onde o motion salva as imagens
4. Verificar se o arquivo /etc/init.d/motion exite e se inclui as linhas do http-server conforme o arquivo conf/motion.init.d
5. Copiar o arquivo conf/rotate-files.sh para /usr/local/bin e incluir a seguinte linha no CRON($ sudo contab -e)
   - ```*/30 * * * * /usr/local/bin/rotate-files.sh /home/bpvelloso/motion-images```

## TODO
- [X] Filtrar eventos por data
- [X] Mover o slider quando utilizar a navegação pelas setas sobre as imagens
- [X] Mostrar loading
- [X] Alterar dias pelas setas laterais do input
- [X] Carregar imagens em cache
- [ ] Modificar o Baixar para Compartilhar vídeo direto
- [X] Configuração de daemons



