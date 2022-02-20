const FooterComponent = () => (
  <>
    <div className="flex-1" />
    <div className="w-full dark:bg-skin-gray-900 bg-skin-secondary-light flex justify-center">
      <div className="grid gap-2 grid-cols-1 w-full p-5 max-w-maxWidthDefault sm:grid-cols-3">
        <div className="flex mb-4 flex-col">
          <h3 className="text-lg text-skin-white font-semibold text-left">Contribua</h3>
          <a
            className="text-skin-white text-sm"
            target="_blank"
            rel="noopener noreferrer"
            href="https://gabrielogregorio.com/">
            Entre em contato
          </a>
          <a
            className="text-skin-white text-sm"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-backend">
            Backend em Node.js github
          </a>
          <a
            className="text-skin-white text-sm"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-frontend">
            Frontend com React.Js github
          </a>
        </div>

        <div className="w-full mb-4 text-center">
          <h3 className="text-lg text-skin-white font-semibold text-left">Projeto</h3>
          <p className="text-left text-sm text-skin-white">
            Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das
            gameplays do nosso cenário.
          </p>
        </div>

        <div className="w-full mb-4 text-center">
          <h3 className="text-lg text-skin-white font-semibold text-left">Sobre</h3>
          <p className="text-left text-sm text-skin-white">
            <span className="text-sm">Vavatips</span> foi criado seguindo a política do
            <a
              className="text-sm"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.riotgames.com/pt-br/juridico">
              “Lenga-Lenga Jurídico”
            </a>
            da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou
            patrocina este projeto.
          </p>
        </div>
      </div>
    </div>
  </>
);
export default FooterComponent;
