# motion-fe

Frontend para consulta de arquivos gerados por detecção de movimento 

## Dependências:

* Motion Project: https://motion-project.github.io/
* http-server: https://www.npmjs.com/package/http-server

## Configuração

1. Instale e configure o Motion
   - A pasta onde o motion deve salvar as imagens deve ser a pasta *motion-images* 
2. Instale o http-server
   - ``` bash$ npm install -g http-server ```
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
- [ ] Mover o slider quando utilizar a navegação pelas setas sobre as imagens
- [ ] Mostrar loading
- [ ] Alterar dias pelas setas laterais do input
- [ ] Carregar imagens em cache
- [ ] Compartilhar vídeo
- [X] Configuração de daemons
- [ ] Integração local no http-server(Verificar???)


