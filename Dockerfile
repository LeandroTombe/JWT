FROM debian:latest

ARG TOKEN=not-set

RUN apt-get update && apt-get install -y curl libgtk-dotnet3.0-cli

ENV RUNNER_ALLOW_RUNASROOT=1

RUN curl -o actions-runner-linux-x64-2.305.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.305.0/actions-runner-linux-x64-2.305.0.tar.gz && tar xzf ./actions-runner-linux-x64-2.305.0.tar.gz

RUN ./config.sh --url https://github.com/LeandroTombe/JWT --token ANYYGCLS6ADK5NSR7QEWO7DEUXYFQ

CMD ["./run.sh"]