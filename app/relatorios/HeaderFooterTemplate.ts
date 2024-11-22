const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

export const headerTemplate = `
    <header style="border: 1px solid black; margin: 0 auto; text-align: center; width: 90%; height: 63px; display: flex; justify-content: center; flex-direction: column; font-size: 16px ">
        <div>

            <h5 style="align-self: center; margin: 5px 0 5px 0; font-weight: 600; color: #0070b5; font-size: 18px">Sistema de Gestão Previdenciario</h5>

            <hr style="width: 79%; margin-left: 110px" />

            <div style="display: flex; justify-content: right">
                <h5 style="align-self: center; margin: 5px 0 5px 0; font-weight: 300">Listagem de clientes</h5>

                <span style="margin-left: 26%; margin-right: 5%; font-size: 12px; align-self: center">
                    ${formattedDate}
                </span>
            </div>
        </div>
    </header>
`;

export const footerTemplate = `
    <footer
        style="
        font-size: 16px;
        position: fixed;
        bottom: 20px;
        left: 39px;
        width: 90%;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 5px 0;
        text-align: center;
        display: flex;
        justify-content: right;
    "
    >
        <h5 style="
            margin: 5px 0;
            font-weight: 300;
            color: #0070b5;
            font-weight: 500
        ">Sigprev Previdência Privada LTDA</h5>
        <div style="width: auto; font-size: 12px; margin-left: 25%; align-self: center; display: flex">Página: <div class='pageNumber' style="margin-left: 2px"> </div>/<div class="totalPages"></div></div>
    </footer>
`;

