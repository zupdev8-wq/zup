#!/usr/bin/env python3
"""Export the editable user workbook to exactly the 4/5-choice ZUP CSV schema.
Optional dependency: py -m pip install openpyxl
Never reads or exports the 'EXEMPLO NAO IMPORTAR' sheet.
"""
import argparse
import csv
from pathlib import Path
from openpyxl import load_workbook


def export(workbook, folder):
    folder.mkdir(parents=True, exist_ok=True)
    wb=load_workbook(workbook, read_only=True, data_only=True)
    for tab,name in [('Perguntas','perguntas-4-alternativas.csv'),('Perguntas 5 alternativas','perguntas-5-alternativas.csv')]:
        if tab not in wb.sheetnames:
            raise ValueError(f'Aba ausente: {tab}')
        ws=wb[tab]
        rows=ws.iter_rows(values_only=True)
        for _ in range(3):
            next(rows, None)
        header=next(rows,None)
        if not header or 'question' not in header or 'review_status' not in header:
            raise ValueError(f'Cabecalho invalido na aba {tab}')
        header=[str(v).strip() for v in header if v is not None]
        if len(set(header))!=len(header):
            raise ValueError(f'Colunas duplicadas em {tab}')
        if tab=='Perguntas 5 alternativas' and 'choice_e' not in header:
            raise ValueError('Nao descarte a coluna choice_e da aba de 5 alternativas')
        output=folder/name
        count=0
        with open(output,'w',encoding='utf-8-sig',newline='') as fh:
            writer=csv.writer(fh);writer.writerow(header)
            for cells in rows:
                values=['' if v is None else str(v) for v in cells[:len(header)]]
                if not any(x.strip() for x in values):
                    continue
                writer.writerow(values);count+=1
        print(f'{tab}: {count} registros -> {output}')


if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('xlsx',type=Path)
    parser.add_argument('--out',default='dados-curadoria',type=Path)
    args=parser.parse_args()
    export(args.xlsx,args.out)
