FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

ARG SOPS_VERSION=3.9.1
ARG TARGETARCH
RUN curl -fsSL "https://github.com/getsops/sops/releases/download/v${SOPS_VERSION}/sops-v${SOPS_VERSION}.linux.${TARGETARCH}" -o /tmp/sops \
    && chmod +x /tmp/sops \
    && mv /tmp/sops /usr/local/bin/sops

USER node
RUN curl -fsSL https://cursor.com/install | bash
ENV PATH="${HOME}/.local/bin:${PATH}"

# Keep container running and ensure node_modules is writable by node (for volume mount)
CMD ["bash", "-c", "[ ! -d /workspace/node_modules ] && sudo mkdir -p /workspace/node_modules || true; sudo chown -R node:node /workspace/node_modules; exec sleep infinity"]
