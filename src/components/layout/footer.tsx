import { ReactElement } from 'react';
import { BiLinkExternal } from 'react-icons/bi';

export const Footer = (): ReactElement => (
  <>
    <div className="flex-1" />
    <div className="w-full dark:bg-skin-gray-900 bg-skin-secondary-light flex justify-center">
      <div className="grid gap-2 grid-cols-1 w-full p-5 max-w-maxWidthDefault sm:grid-cols-3">
        <div className="flex mb-4 flex-col">
          <h2 className="text-lg text-skin-white font-bold text-center sm:text-left">Contribua</h2>
          <a
            className="hover:scale-105 hover:bg-secondary hover:pl-4 transition-all duration-150 font-medium text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
            Reportar Bugs
            <BiLinkExternal className="inline ml-1" />
          </a>

          <a
            className="hover:scale-105 hover:bg-secondary hover:pl-4 transition-all duration-150 font-medium text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/valorant-tips/issues/new">
            Solicitar agentes e mapas
            <BiLinkExternal className="inline ml-1" />
          </a>
          <a
            className="hover:scale-105 hover:bg-secondary hover:pl-4 transition-all duration-150 font-medium text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-backend">
            Backend em Node.js
            <BiLinkExternal className="inline ml-1" />
          </a>
          <a
            className="hover:scale-105 hover:bg-secondary hover:pl-4 transition-all duration-150 font-medium text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  text-base"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gabrielogregorio/vavatips-frontend">
            Frontend com Next.Js
            <BiLinkExternal className="inline ml-1" />
          </a>
        </div>

        <div className="w-full mb-4 text-center sm:text-left">
          <h2 className="text-lg text-skin-white font-bold ">Projeto</h2>
          <p className="font-medium text-skin-white py-3 sm:py-1 px-3.5 sm:px-0 text-center sm:text-left  ">
            Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das gameplays do nosso
            cenário.
          </p>
        </div>

        <div className="w-full mb-4 text-center sm:text-left">
          <h2 className="text-lg text-skin-white font-bold ">Sobre</h2>
          <p className=" text-base text-skin-white">
            <span className="text-sm">Valorant tips</span> foi criado seguindo a política do &nbsp;
            <a
              className="text-base text-center sm:text-left text-white font-bold underline"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.riotgames.com/pt-br/juridico">
              Lenga-Lenga Jurídico
              <BiLinkExternal className="inline ml-1" />
            </a>
            &nbsp; da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou patrocina este
            projeto.
          </p>
        </div>
      </div>
    </div>
  </>
);
