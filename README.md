<img src="https://github.com/Vinicius-Pereira/core-inc-animation/blob/main/Cabe%C3%A7alho%20Formul%C3%A1rio.png?raw=true" alt="core inc logo"/>

# Core Inc
Uma ferramenta de algoritmos animados para estágio iniciais de aprendizado de algoritmos.

<p align="center">
  <img src="https://i.imgur.com/rJX0lqr.gif">
</p>

## Tecnologias Utilizadas
Softwares e linguagens utilizadas nesta plataforma de testes e no framework de animação disponível <a href="https://github.com/Vinicius-Pereira/core-inc-animation">aqui.</a>

### Plataforma de Aplicação e Testes
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
### Biblioteca de Animações
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Aseprite](https://img.shields.io/badge/Aseprite-FFFFFF?style=for-the-badge&logo=Aseprite&logoColor=#7D929E)

Requisitos necessários:
</br>
### ATENÇÃO, ESTA É SOMENTE UMA PLATAFORMA DE TESTES, É RECOMENDADO A UTILIZAÇÃO DA BIBLIOTECA DE ANIMAÇÕES DISPONÍVEL SEPARADAMENTE <a href="https://github.com/Vinicius-Pereira/core-inc-animation">AQUI</a>
1.	Fazer o download da biblioteca de animação e adicione ao seu projeto.
2.	Importar a lista de dependências abaixo no arquivo em que o Core Inc. será utilizado.
```
    <!-- Core Inc Dependencies -->
    <link rel="stylesheet" href="/css/standart.css" />
    <link rel="stylesheet" href="/css/tooltip.css" />
    <link rel="stylesheet" href="/css/screen.css" />
    <link rel="stylesheet" href="/css/animation-logo.css" />
    <link rel="stylesheet" href="/css/animation-screen.css" />
    <link rel="stylesheet" href="/css/animation-lucy.css" />
    <link rel="stylesheet" href="/css/animation-m3m0.css" />
    <link rel="stylesheet" href="/css/animation-ursula.css" />
    <link rel="stylesheet" href="/css/animation-bus.css" />
    <link rel="stylesheet" href="/css/animation-package.css" />
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script type="text/javascript" src="/js/jquery.fittext.js"></script>
    <script type="text/javascript" src="/js/animation.js"></script>
    <script type="text/javascript" src="/js/tooltip.js"></script>
    <script type="text/javascript" src="/js/helper.js"></script>
    <script type="text/javascript" src="/js/start.js"></script>
    <script type="text/javascript" src="/js/animation-controller.js"></script>
    <script type="text/javascript" src="/js/pause.js"></script>
  ```
3.	Adicionar a tag HTML abaixo na posição desejada do arquivo.
  ```
  <div id="content-core"></div>
  ```
## Como utilizar as animações
Cada animação do Core Inc. é acionada através do mesmo endpoint, onde é recebida a entrada de dados em formato de vetores (array) com as informações necessárias para a animação. Entradas de dados diferentes acionarão animações diferentes. Abaixo constam quais os tipos de vetores de entrada esperados para cada animação:

#### Início do Programa
Animação para o comando de inicialização do programa.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| program | string | string "program" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| nome do programa | string | string com o nome do programa |

#### Declaração de Variável
Animação para declaração de vairáveis.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| var | string | string "var" ou "CONST" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |

#### Leitura
Animação para comandos de leitura de dados.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| read | string | string "read" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |

#### Escrita
Animação para comandos de escrita de dados na tela.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| write | string | string "write" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |

#### Escrita Complexa
Animação para escrita de dados que não são somente exibir o conteúdo da variável.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| write(y + x) | string | string "write(y + x)" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |
| nome da variável 2 | string | string com o nome da variável 2|
| tipo da variável 2 | string | string com o nome do tipo da variável 2|
| valor da variável 2 | string | string com o valor da variável 2 |
| (...) | (...) | (...) |

#### Cálculo e Atribuição
Animação para cálculo e atribuição simples e de resultado de expressões.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| x = y + z | string | string "x = y + z" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| expressão do cálculo | string | string com a expressão calculada |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |
| nome da variável 2 | string | string com o nome da variável 2|
| tipo da variável 2 | string | string com o nome do tipo da variável 2|
| valor da variável 2 | string | string com o valor da variável 2 |
| (...) | (...) | (...) |

#### Controle de Fluxo - Se Senão
Animação para controle de fluxo se, senão.
| Comando | Tipo | Descrição | 
| --- | --- | --- |
| if | string | string "if" informando o tipo de animação |
| linha de instrução | string | string com a linha completa de código a ser executada |
| próxima linha de instrução/comando | string | string com a próxima linha completa de código a ser executada |
| expressão de comparação | string | string com a expressão de comparação da estrutura condicional |
| resultado da comparação | string | string com o resultado da comparação. Recomenda-se: "Verdadeiro" ou "Falso" |
| nome da variável | string | string com o nome da variável |
| tipo da variável | string | string com o nome do tipo da variável |
| valor da variável | string | string com o valor da variável |
| nome da variável 2 | string | string com o nome da variável 2|
| tipo da variável 2 | string | string com o nome do tipo da variável 2|
| valor da variável 2 | string | string com o valor da variável 2 |
| (...) | (...) | (...) |

