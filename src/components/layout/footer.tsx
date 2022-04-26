export const Footer = () => (
  <>
    <div className="flex-1" />
    <div className="w-full dark:bg-skin-gray-900 bg-skin-secondary-light flex justify-center">
      <div className="grid gap-2 grid-cols-1 w-full p-5 max-w-maxWidthDefault sm:grid-cols-3">
        <div className="flex mb-4 flex-col">
          <h3 className="text-lg text-skin-white font-bold text-center sm:text-left">Contribua</h3>
          <a
            className="text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
            Reportar Bugs
          </a>

          <a
            className="text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
            Solicitar agentes e mapas
          </a>
          <a
            className="text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-backend">
            Backend em Node.js github
          </a>
          <a
            className="text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-frontend">
            Frontend com React.Js github
          </a>
        </div>

        <div className="w-full mb-4 text-center sm:text-left">
          <h3 className="text-lg text-skin-white font-bold ">Projeto</h3>
          <p className=" text-base text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  ">
            Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das gameplays do nosso
            cenário.
          </p>
        </div>

        <div className="w-full mb-4 text-center sm:text-left">
          <h3 className="text-lg text-skin-white font-bold ">Sobre</h3>
          <p className=" text-base text-skin-white">
            <span className="text-sm">Valorant tips</span> foi criado seguindo a política do
            <a
              className="text-base text-center sm:text-left text-skin-secondary-regular "
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.riotgames.com/pt-br/juridico">
              “Lenga-Lenga Jurídico”
            </a>
            da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou patrocina este projeto.
          </p>
        </div>
      </div>
    </div>
  </>
);
