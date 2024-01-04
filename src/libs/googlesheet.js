
import {GoogleSpreadsheet} from "google-spreadsheet";
import {useEffect, useState} from "react";

const credential = require('../json/mvp-chat-334505-250c27245707.json');

// 구글 시트 조회하는 로직
export const getGoogleSheet: () => Promise<GoogleSpreadsheet> = async () => {
		const doc = new GoogleSpreadsheet(process.env.REACT_APP_ID);
		await doc.useServiceAccountAuth(credential);
    // 구글 인증이 필요하다.
    await doc.loadInfo();
    return doc;
}

// 구글 시트 조회하는 custom useHook
export const useGetGoogleSheet = (sheetId: string) => {
    const [googleSheetRows, setGoogleSheetRows] = useState([]);

    const fetchGoogleSheetRows = async () => {
        const googleSheet = await getGoogleSheet();
        const sheetsByIdElement = googleSheet.sheetsById[sheetId];
        const rows = await sheetsByIdElement.getRows();
        setGoogleSheetRows(rows)
    }

    useEffect(() => {
        fetchGoogleSheetRows();
    },[]);

    return [googleSheetRows];
}

export const useSetGoogleSheet = async () => {
  const googleSheet = await getGoogleSheet();
  const sheet = await googleSheet.addSheet({ headerValues: ['name', 'id'] });
  const larryRow = await sheet.addRow({ name: 'Larry Page', id: 'larry@google.com' });
}

