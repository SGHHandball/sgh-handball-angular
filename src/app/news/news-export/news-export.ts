import {Document, Media, Packer, Paragraph, TextRun} from "docx";
import {getDateString, News} from "../../model/news";
import {saveAs} from 'file-saver';

export function exportNewsToText(exportNews: News[]) {
  const doc = new Document();

  exportNews.forEach(news => {
    const children = [
      getDateLine(news),
      getMatchLine(news),
      getTitle(news),
      getBody(news),
      getSummaryHeader(),
      getSummary(news),
      getPlayersHeader(news),
      getPlayers(news)
    ];
    if (news.imgLinks.length > 0) {
      children.push(getImageHeader());
      news.imgLinks.forEach(link => {
        children.push(getImageLink(doc, link));
      })
    }


    doc.addSection({
      properties: {},
      children: children,
    });
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "Export_" + getDateString(new Date()) + ".docx");
  });
}

export function getDateLine(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: getDateString(news.date) + " - " + news.teamAge + ":",
        bold: true,
      })
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getMatchLine(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: news.homeTeam + " - " + news.enemyTeam,
        bold: true,
      }),
      new TextRun({
        text: news.score,
        bold: true,
      }).tab(),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getTitle(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: news.title,
        bold: true,
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getBody(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: news.body
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getSummaryHeader(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Zusammenfassung",
        bold: true,
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getSummary(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: news.summary
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getPlayersHeader(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Es Spielten:",
        bold: true,
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getPlayers(news: News): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: news.players
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}

export function getImageHeader(): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: "Links zu Bildern:",
        bold: true,
      }),
    ],
    spacing: {
      after: 200,
    },
  });
}


export function getImageLink(doc: Document, link: string): Paragraph {
  const paragraph = new Paragraph({
    spacing: {
      after: 200,
    }
  });
  const hyperlink = doc.createHyperlink(link, link);
  paragraph.addHyperLink(hyperlink);
  return paragraph;
}
