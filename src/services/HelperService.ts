export class HelperService {

    static newDateTime(): string {
        const date = new Date().toUTCString();
        return date.substring(0, date.indexOf(':')-3).replace(',','').replace(/[ \s]/g, '_');
    }

    static searchTerm(term: string): string {
        term = term.toLowerCase().trim();
        if (term.includes('.')) term = term.substr(0, term.indexOf('.'));
        return term;
    }

    static bucketFormat(bucketName: string): string {
        bucketName = bucketName.toLowerCase().trim().replace(/_/g, '-').replace(/ /g, '-');
        return bucketName;
    }

    static dayOfWeek(getDay?: string): string {
        const weekday=new Array(7);
        weekday[1]="monday";
        weekday[2]="tuesday";
        weekday[3]="wednesday";
        weekday[4]="thursday";
        weekday[5]="friday";
        weekday[6]="saturday";
        weekday[0]="sunday";

        if (getDay) return weekday[parseInt(getDay)];
        return weekday[new Date().getDay()];
    }

    static tickerDataBuilder(capturedData: string): RegExpMatchArray | null {
        if (!capturedData) return null;

        let termsList1 = capturedData.match(/[$][A-Za-z][\S]\w{0,5}/g);
        if (termsList1) termsList1.forEach((e) => {
            if (termsList1 && e) termsList1 = termsList1.filter((e) => e.length < 7);
        });

        const termsList2 = capturedData.match(/[$][A-Za-z](?=\s)/g);

        if (termsList1 && termsList2) {
            return (termsList1.concat(termsList2));
        } else if (termsList1) {
            return termsList1;
        } else if (termsList2) {
            return termsList2;
        }
        return null;
    }

    static sentimentAnalysis(capturedData:string): string {
        capturedData = capturedData.toLowerCase();
        let sentimentVal = 0;

        // A hyper advanced AI system that intelligently reads data to discern sentiment. Ahead of it's time. Wow.
        if (capturedData.includes('bull')) sentimentVal++; // 1
        else if (capturedData.includes('buy')) sentimentVal++; // 2
        else if (capturedData.includes('long')) sentimentVal++; // 3
        else if (capturedData.includes('bought')) sentimentVal++; // 4
        else if (capturedData.includes('hold')) sentimentVal++; // 5
        else if (capturedData.includes('hodl')) sentimentVal++; // 6
        else if (capturedData.includes('moon')) sentimentVal++; // 7
        else if (capturedData.includes('best')) sentimentVal++; // 8
        else if (capturedData.includes('top')) sentimentVal++; // 9
        else if (capturedData.includes('pump')) sentimentVal++; // 10
        else if (capturedData.includes('high')) sentimentVal++; // 11
        else if (capturedData.includes('climb')) sentimentVal++; // 12
        else if (capturedData.includes('up')) sentimentVal++; // 13

        if (capturedData.includes('bear')) sentimentVal--; // 1
        else if (capturedData.includes('sell')) sentimentVal--; // 2
        else if (capturedData.includes('short')) sentimentVal--; // 3
        else if (capturedData.includes('sold')) sentimentVal--; // 4
        else if (capturedData.includes('close')) sentimentVal--; // 5
        else if (capturedData.includes('crash')) sentimentVal--; // 6
        else if (capturedData.includes('fall')) sentimentVal--; // 7
        else if (capturedData.includes('worst')) sentimentVal--; // 8
        else if (capturedData.includes('bottom')) sentimentVal--; // 9
        else if (capturedData.includes('dump')) sentimentVal--; // 10
        else if (capturedData.includes('baghold')) sentimentVal--; // 11
        else if (capturedData.includes('drop')) sentimentVal--; // 12
        else if (capturedData.includes('down')) sentimentVal--; // 13

        // sentimentVal = 1 (Bullish), 0 (Neutral/Neutralised) or -1 (Bearish).
        let sentimentSQL = ' ';
        if (sentimentVal > 0) sentimentSQL = ' Bull_Sentiment = Bull_Sentiment + 1, ';
        else if (sentimentVal < 0) sentimentSQL = ' Bear_Sentiment = Bull_Sentiment + 1, ';

        return sentimentSQL;
    }
}