FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

ARG SOPS_VERSION=3.9.1
ARG TARGETARCH
RUN curl -fsSL "https://github.com/getsops/sops/releases/download/v${SOPS_VERSION}/sops-v${SOPS_VERSION}.linux.${TARGETARCH}" -o /tmp/sops \
    && chmod +x /tmp/sops \
    && mv /tmp/sops /usr/local/bin/sops

COPY .devcontainer/devcontainer-entry.sh /usr/local/bin/devcontainer-entry.sh
RUN chmod +x /usr/local/bin/devcontainer-entry.sh

USER node
RUN curl -fsSL https://cursor.com/install | bash
ENV PATH="${HOME}/.local/bin:${PATH}"

ENTRYPOINT ["/usr/local/bin/devcontainer-entry.sh"]
CMD ["sleep", "infinity"]
