FROM continuumio/miniconda3

RUN pip install scikit-network
RUN conda install -c conda-forge spacy
RUN python -m spacy download en_core_web_lg
RUN pip install Flask
RUN pip install -U flask-cors

WORKDIR /app

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]